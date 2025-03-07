
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSuggestionById, getComments } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronUp,
  MessageSquare,
  Clock,
  Send,
  Loader2,
} from "lucide-react";

export function SuggestionDetail() {
  const { id } = useParams<{ id: string }>();
  const suggestion = getSuggestionById(id || "");
  const comments = getComments(id || "");
  
  const [isUpvoted, setIsUpvoted] = useState(suggestion?.isUpvoted || false);
  const [upvotes, setUpvotes] = useState(suggestion?.upvotes || 0);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!suggestion) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Suggestion not found</h2>
        <p className="text-muted-foreground mb-6">
          The suggestion you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/suggestions">Back to Suggestions</Link>
        </Button>
      </div>
    );
  }
  
  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    
    setIsUpvoted(!isUpvoted);
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCommentText("");
      toast.success("Comment added successfully!");
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 -ml-3">
          <Link to="/suggestions" className="flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Suggestions</span>
          </Link>
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">
                {suggestion.category}
              </span>
              <StatusBadge status={suggestion.status} />
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="w-3 h-3 mr-1" />
                <time dateTime={suggestion.createdAt}>
                  {new Date(suggestion.createdAt).toLocaleDateString()}
                </time>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold">{suggestion.title}</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleUpvote}
              variant={isUpvoted ? "default" : "outline"}
              className="flex items-center gap-1"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Upvote{isUpvoted ? "d" : ""}</span>
              <span className="ml-1">({upvotes})</span>
            </Button>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none mb-8">
          <p className="text-lg text-muted-foreground">{suggestion.description}</p>
        </div>
        
        <Separator className="my-8" />
        
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
          </div>
          
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Comment
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 animate-enter">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>
                    {comment.author.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{comment.author}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
            
            {comments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No comments yet. Be the first to share your thoughts!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionDetail;
