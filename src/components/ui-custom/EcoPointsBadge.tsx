
import React from "react";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface EcoPointsBadgeProps {
  points: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const EcoPointsBadge = ({
  points,
  className,
  size = "md",
  showText = true,
}: EcoPointsBadgeProps) => {
  const sizeClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-1 px-3",
    lg: "text-base py-1.5 px-4",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        "bg-eco-light text-eco-dark border border-eco-green/20",
        "transition-all duration-300 hover:shadow-subtle",
        sizeClasses[size],
        className
      )}
    >
      <Leaf className={cn(iconSizes[size], "text-eco-green")} strokeWidth={2.5} />
      {showText && (
        <span className="animate-scale-in">
          {points} <span className="hidden sm:inline">points</span>
        </span>
      )}
    </div>
  );
};

export default EcoPointsBadge;
