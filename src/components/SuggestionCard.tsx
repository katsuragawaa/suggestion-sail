
import { useState } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";
import { 
  MessageSquare, 
  ChevronUp, 
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: 'discovery' | 'development' | 'shipped' | 'closed';
  upvotes: number;
  comments: number;
  createdAt: string;
  category: string;
  isUpvoted?: boolean;
}

interface SuggestionCardProps {
  suggestion: Suggestion;
  className?: string;
  detailed?: boolean;
}

export function SuggestionCard({ suggestion, className, detailed = false }: SuggestionCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(suggestion.isUpvoted || false);
  const [upvotes, setUpvotes] = useState(suggestion.upvotes);
  
  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    
    setIsUpvoted(!isUpvoted);
  };
  
  return (
    <div className={cn("suggestion-card group", className)}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">
            {suggestion.category}
          </span>
          <StatusBadge status={suggestion.status} />
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <Clock className="w-3 h-3 mr-1" />
          <time dateTime={suggestion.createdAt}>
            {new Date(suggestion.createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>
      
      <Link to={`/suggestions/${suggestion.id}`} className="block">
        <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
          {suggestion.title}
        </h3>
        
        {detailed ? (
          <p className="text-muted-foreground">{suggestion.description}</p>
        ) : (
          <p className="text-muted-foreground line-clamp-2">{suggestion.description}</p>
        )}
      </Link>
      
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={handleUpvote}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors",
            isUpvoted 
              ? "bg-primary/10 text-primary" 
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          <ChevronUp className="w-4 h-4" />
          <span className="font-medium">{upvotes}</span>
        </button>
        
        <Link 
          to={`/suggestions/${suggestion.id}`} 
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{suggestion.comments}</span>
        </Link>
      </div>
    </div>
  );
}
