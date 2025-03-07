
import { cn } from "@/lib/utils";

type Status = 'discovery' | 'development' | 'shipped' | 'closed';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfigs = {
  discovery: {
    label: "Discovery",
    className: "bg-blue-100 text-blue-800"
  },
  development: {
    label: "Development",
    className: "bg-purple-100 text-purple-800"
  },
  shipped: {
    label: "Shipped",
    className: "bg-green-100 text-green-800"
  },
  closed: {
    label: "Closed",
    className: "bg-gray-100 text-gray-800"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfigs[status];
  
  return (
    <span className={cn("status-pill", config.className, className)}>
      {config.label}
    </span>
  );
}
