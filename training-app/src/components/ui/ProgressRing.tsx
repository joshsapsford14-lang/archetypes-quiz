import type { ReactNode } from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { useTween } from "@/lib/hooks/useTween";
import { colors } from "@/theme";

interface ProgressRingProps {
  progress: number; // 0..1
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  animate?: boolean;
  children?: ReactNode;
}

/** Animated SVG progress ring — the centerpiece of the Today screen. */
export function ProgressRing({
  progress,
  size = 220,
  strokeWidth = 16,
  color = colors.volt,
  trackColor = colors.line,
  animate = true,
  children,
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(progress, 1));
  const tweened = useTween(clamped, { durationMs: 1100, start: animate });
  const value = animate ? tweened : clamped;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value);

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg
        width={size}
        height={size}
        style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </Svg>
      {children}
    </View>
  );
}
