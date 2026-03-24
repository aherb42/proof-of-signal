import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_TAGS = [
  "Recognition",
  "Missed Credit",
  "Constructive Feedback",
  "Manager Signal",
  "Org / Political Signal",
  "Personal Milestone",
] as const;

const SYSTEM_PROMPT = `You are a career signal classifier. Given a short text describing a workplace moment, classify it into exactly one of these 6 categories using the classify_signal tool.

## Categories

1. **Recognition** — The user's contribution was acknowledged publicly or privately — a shoutout in a meeting, positive feedback from a stakeholder, or a peer crediting their work.

2. **Missed Credit** — The user's idea, work, or contribution was attributed to someone else, or went unacknowledged entirely. Can be subtle — worth noting even when the user isn't sure.

3. **Constructive Feedback** — Input the user received about an area to develop or improve. Includes formal feedback, informal coaching, or repeated observations from others.

4. **Manager Signal** — A shift in the user's manager's behavior, tone, or attention toward them — shorter 1:1s, change in communication style, new visibility or reduced access.

5. **Org / Political Signal** — An organizational dynamic worth tracking — restructuring, budget signals, stakeholder shifts, or changes in team direction that affect the user's position.

6. **Personal Milestone** — A meaningful moment in the user's own career progression — first time leading something, a stretch assignment, a door that opened.

## Rules
- Choose the single best-fitting category based on the overall meaning, not individual words.
- If a manager is simply the subject of praise (e.g. "My manager gave me a great shoutout"), classify as Recognition, not Manager Signal.
- When uncertain, prefer the category that best captures the user's experience.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text.trim() },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "classify_signal",
              description: "Classify a career signal into one category.",
              parameters: {
                type: "object",
                properties: {
                  tag: {
                    type: "string",
                    enum: VALID_TAGS,
                    description: "The signal category that best fits the text.",
                  },
                },
                required: ["tag"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "classify_signal" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited — please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI classification failed", fallback: true }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      const args = JSON.parse(toolCall.function.arguments);
      if (VALID_TAGS.includes(args.tag)) {
        return new Response(
          JSON.stringify({ tag: args.tag }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // If tool calling didn't return a valid tag, signal fallback
    console.error("Unexpected AI response structure:", JSON.stringify(data));
    return new Response(
      JSON.stringify({ error: "Could not parse AI response", fallback: true }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("classify-signal error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", fallback: true }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
