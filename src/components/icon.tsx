// src/components/Icon.tsx
import { LucideIcon } from "lucide-react";
import React from "react";

interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  className = "",
  size = 24,
}) => {
  return <IconComponent className={className} size={size} />;
};
