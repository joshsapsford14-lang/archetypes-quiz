import { cssInterop } from "nativewind";
import type { ReactNode } from "react";
import { Pressable, type PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
cssInterop(AnimatedPressable, { className: "style" });

interface PressableScaleProps extends Omit<PressableProps, "children"> {
  className?: string;
  pressedScale?: number;
  children?: ReactNode;
}

/** Pressable with a snappy scale-down on press. Respects reduced-motion. */
export function PressableScale({
  className,
  pressedScale = 0.96,
  onPressIn,
  onPressOut,
  children,
  ...rest
}: PressableScaleProps) {
  const reduced = useReducedMotion();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      className={className}
      style={animatedStyle}
      onPressIn={(e) => {
        if (!reduced) scale.value = withTiming(pressedScale, { duration: 90 });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        if (!reduced) scale.value = withTiming(1, { duration: 150 });
        onPressOut?.(e);
      }}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
