/**
 * EmptyState — placeholder illustration shown when a list has no items.
 *
 * @param title - Bold heading text.
 * @param description - Supporting body copy.
 */
import { FileText } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-20 h-20 rounded-full bg-rose-soft flex items-center justify-center mb-6">
      <FileText className="w-8 h-8 text-blush" strokeWidth={1.5} />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground max-w-sm">{description}</p>
  </div>
);

export default EmptyState;
