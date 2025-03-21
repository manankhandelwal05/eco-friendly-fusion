
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

export const GlassCard = ({
  children,
  className,
  footerContent,
  headerContent,
  hoverable = false,
  style,
}: GlassCardProps) => {
  return (
    <Card 
      className={cn(
        "border border-green-100/50 rounded-xl overflow-hidden transition-all duration-300 shadow-md",
        "bg-white/80 backdrop-blur-sm",
        hoverable && "hover:shadow-lg hover:translate-y-[-2px]",
        className
      )}
      style={style}
    >
      {headerContent && <CardHeader className="p-5">{headerContent}</CardHeader>}
      <CardContent className={cn("p-5", !headerContent && "pt-5")}>
        {children}
      </CardContent>
      {footerContent && <CardFooter className="p-5 pt-0">{footerContent}</CardFooter>}
    </Card>
  );
};

export default GlassCard;
