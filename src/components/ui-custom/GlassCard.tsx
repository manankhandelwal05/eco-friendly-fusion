
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  hoverable?: boolean;
}

export const GlassCard = ({
  children,
  className,
  footerContent,
  headerContent,
  hoverable = false,
}: GlassCardProps) => {
  return (
    <Card 
      className={cn(
        "glass border-none rounded-xl overflow-hidden transition-all duration-300",
        hoverable && "hover:shadow-hover hover:translate-y-[-2px]",
        className
      )}
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
