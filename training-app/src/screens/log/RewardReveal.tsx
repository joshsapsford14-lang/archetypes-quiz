import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  ReduceMotion,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Button, Card, Screen } from "@/components/ui";
import { getTrainingType } from "@/data/trainingTypes";
import type { GradeResult } from "@/lib/grading";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { colors } from "@/theme";
import type { GradeTier, Rank, TrainingTypeId } from "@/types";

import { GRADE_COLOR, GradeBadge } from "./GradeBadge";

const GRADE_TITLE: Record<GradeTier, string> = {
  S: "Outstanding",
  A: "Brilliant",
  B: "Solid work",
  C: "Good work",
};

interface RewardRevealProps {
  result: GradeResult;
  typeId: TrainingTypeId;
  durationMin: number;
  isExtra: boolean;
  leveledUp: boolean;
  level: number;
  rankedUp: boolean;
  rank: Rank;
  onDone: () => void;
}

/** Soft pulsing halo behind the grade badge. Static when reduced-motion is on. */
function GlowPulse({ color }: { color: string }) {
  const reduced = useReducedMotion();
  const p = useSharedValue(0);

  useEffect(() => {
    if (reduced) return;
    p.value = withRepeat(
      withTiming(1, { duration: 1700, easing: Easing.out(Easing.ease) }),
      -1,
      false,
    );
  }, [reduced, p]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + p.value * 0.45 }],
    opacity: 0.4 * (1 - p.value),
  }));

  const base = { position: "absolute" as const, width: 176, height: 176, borderRadius: 88 };
  if (reduced) {
    return <View style={[base, { backgroundColor: color, opacity: 0.12 }]} />;
  }
  return <Animated.View style={[base, { backgroundColor: color }, style]} />;
}

export function RewardReveal({
  result,
  typeId,
  durationMin,
  isExtra,
  leveledUp,
  level,
  rankedUp,
  rank,
  onDone,
}: RewardRevealProps) {
  const color = GRADE_COLOR[result.grade];
  const counted = useCountUp(result.totalXp, { durationMs: 1300, delayMs: 550 });
  const type = getTrainingType(typeId);

  useEffect(() => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  const enter = (delay: number) =>
    FadeInDown.duration(420).delay(delay).reduceMotion(ReduceMotion.System);

  return (
    <Screen>
      <View className="items-center pt-2">
        <Text className="font-hud text-[11px] uppercase tracking-[0.3em] text-muted">
          Session complete
        </Text>
        <Text className="mt-1 font-body text-sm text-muted">
          {durationMin}m · {type.label}
          {isExtra ? " · Extra" : ""}
        </Text>

        {/* Grade badge with halo */}
        <View className="mt-7 items-center justify-center">
          <GlowPulse color={color} />
          <Animated.View entering={ZoomIn.springify().damping(12).reduceMotion(ReduceMotion.System)}>
            <GradeBadge grade={result.grade} stars={result.stars} />
          </Animated.View>
        </View>

        <Animated.Text
          entering={enter(220)}
          style={{ color }}
          className="mt-5 font-display text-3xl"
        >
          {GRADE_TITLE[result.grade]}
        </Animated.Text>

        {/* The hero count-up */}
        <Text className="mt-8 font-hud text-[11px] uppercase tracking-[0.3em] text-muted">
          XP earned
        </Text>
        <Text className="font-display text-volt" style={{ fontSize: 84, lineHeight: 92 }}>
          {counted}
        </Text>
      </View>

      {/* XP breakdown */}
      <Card className="mt-4 p-4">
        {result.breakdown.map((item, i) => (
          <Animated.View
            key={item.key}
            entering={enter(750 + i * 110)}
            className="flex-row items-center justify-between py-1.5"
          >
            <Text className="font-body text-sm text-muted">{item.label}</Text>
            <Text
              className={`font-hud text-sm ${item.kind === "bonus" ? "text-volt" : "text-chalk"}`}
            >
              {item.kind === "bonus" ? "+" : ""}
              {item.xp}
            </Text>
          </Animated.View>
        ))}
        <View className="my-2 h-px bg-line" />
        <View className="flex-row items-center justify-between">
          <Text className="font-body-bold text-base text-chalk">Total</Text>
          <Text className="font-hud text-base text-volt">{result.totalXp} XP</Text>
        </View>
      </Card>

      {/* Level up / rank up */}
      {(leveledUp || rankedUp) && (
        <Animated.View entering={enter(950)}>
          <Card className="mt-4 flex-row items-center gap-3 p-4" style={{ borderColor: colors.volt }}>
            <Text style={{ fontSize: 28 }}>{rankedUp ? rank.emoji : "⬆️"}</Text>
            <View className="flex-1">
              <Text className="font-display text-xl text-volt">
                {rankedUp ? `New rank: ${rank.name}` : `Level ${level}!`}
              </Text>
              <Text className="font-body text-xs text-muted">
                {rankedUp
                  ? "You climbed the ladder — huge."
                  : "You leveled up. Keep climbing."}
              </Text>
            </View>
          </Card>
        </Animated.View>
      )}

      {/* Coach guidance */}
      <Animated.View entering={enter(1050)}>
        <Card className="mt-4 p-4">
          <View className="mb-2 flex-row items-center gap-2">
            <Ionicons name="megaphone" size={15} color={colors.aqua} />
            <Text className="font-hud text-[11px] uppercase tracking-wider text-aqua">Coach</Text>
          </View>
          <Text className="font-body text-[15px] leading-5 text-chalk">
            {result.guidance.praise}
          </Text>
          <Text className="mt-2 font-body text-[15px] leading-5 text-muted">
            💡 {result.guidance.tip}
          </Text>
        </Card>
      </Animated.View>

      <View className="mt-6">
        <Button label="Done" size="lg" onPress={onDone} />
      </View>
    </Screen>
  );
}
