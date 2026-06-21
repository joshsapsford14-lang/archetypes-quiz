import { View } from "react-native";

import { useTween } from "@/lib/hooks/useTween";
import { colors } from "@/theme";

interface XpBarProps {
  progress: number; // 0..1
  height?: number;
  color?: string;
  animate?: boolean;
  className?: string;
}

export function XpBar({
  progress,
  height = 10,
  color = colors.volt,
  animate = true,
  className,
}: XpBarProps) {
  const clamped = Math.max(0, Math.min(progress, 1));
  const tweened = useTween(clamped, { durationMs: 900, start: animate });
  const value = animate ? tweened : clamped;

  return (
    <View
      className={`overflow-hidden rounded-full bg-line ${className ?? ""}`}
      style={{ height }}
    >
      <View
        style={{ width: `${value * 100}%`, height: "100%", backgroundColor: color, borderRadius: 999 }}
      />
    </View>
  );
}
