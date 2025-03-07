
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({ title, value, icon: Icon, change, className }: MetricCardProps) {
  return (
    <div className={cn("metric-card", className)}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">{value}</span>
          
          {change && (
            <div className="flex items-center mt-1">
              <span 
                className={cn(
                  "text-xs font-medium flex items-center",
                  change.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
