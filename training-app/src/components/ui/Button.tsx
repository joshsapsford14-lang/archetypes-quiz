import type { ReactNode } from "react";
import { Text } from "react-native";

import { PressableScale } from "./PressableScale";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const CONTAINER: Record<Variant, string> = {
  primary: "bg-volt border-volt",
  secondary: "bg-surface border-line",
  ghost: "bg-transparent border-transparent",
};

const LABEL: Record<Variant, string> = {
  primary: "text-pitch",
  secondary: "text-chalk",
  ghost: "text-muted",
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  className,
  disabled,
}: ButtonProps) {
  const pad = size === "lg" ? "py-4" : "py-3";
  const textSize = size === "lg" ? "text-lg" : "text-base";
  return (
    <PressableScale
      onPress={disabled ? undefined : onPress}
      className={`w-full flex-row items-center justify-center gap-2 rounded-2xl border ${pad} ${CONTAINER[variant]} ${disabled ? "opacity-40" : ""} ${className ?? ""}`}
    >
      {icon}
      <Text className={`font-body-bold ${textSize} ${LABEL[variant]}`}>{label}</Text>
    </PressableScale>
  );
}
