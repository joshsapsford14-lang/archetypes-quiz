import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { DurationPicker } from "@/components/log/DurationPicker";
import { ExtraToggle } from "@/components/log/ExtraToggle";
import { TypePicker } from "@/components/log/TypePicker";
import { Button, Screen, SectionHeader, SegmentedControl } from "@/components/ui";
import type { GradeResult } from "@/lib/grading";
import { levelFromXp, rankForLevel } from "@/lib/progression";
import { totalXp } from "@/lib/stats";
import { useGameStore } from "@/store/useGameStore";
import { colors } from "@/theme";
import type { Intensity, Rank, TrainingTypeId } from "@/types";

import { RewardReveal } from "./RewardReveal";

interface RewardState {
  result: GradeResult;
  typeId: TrainingTypeId;
  durationMin: number;
  isExtra: boolean;
  leveledUp: boolean;
  level: number;
  rankedUp: boolean;
  rank: Rank;
}

export function LogScreen() {
  const router = useRouter();
  const logSession = useGameStore((s) => s.logSession);

  const dismiss = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const [typeId, setTypeId] = useState<TrainingTypeId | null>(null);
  const [durationMin, setDurationMin] = useState(30);
  const [intensity, setIntensity] = useState<Intensity>("moderate");
  const [isExtra, setIsExtra] = useState(false);
  const [reward, setReward] = useState<RewardState | null>(null);

  const onSubmit = () => {
    if (!typeId) return;
    const before = levelFromXp(totalXp(useGameStore.getState().sessions));
    const { result } = logSession({ typeId, durationMin, intensity, isExtra });
    const after = levelFromXp(totalXp(useGameStore.getState().sessions));
    const rankBefore = rankForLevel(before.level);
    const rankAfter = rankForLevel(after.level);
    setReward({
      result,
      typeId,
      durationMin,
      isExtra,
      leveledUp: after.level > before.level,
      level: after.level,
      rankedUp: rankAfter.id !== rankBefore.id,
      rank: rankAfter,
    });
  };

  if (reward) {
    return <RewardReveal {...reward} onDone={dismiss} />;
  }

  return (
    <Screen>
      <View className="mb-5 mt-1 flex-row items-center justify-between">
        <Text className="font-display text-4xl text-chalk">Log a session</Text>
        <Pressable onPress={dismiss} hitSlop={10}>
          <Ionicons name="close-circle" size={32} color={colors.muted} />
        </Pressable>
      </View>

      <SectionHeader title="What did you train?" />
      <TypePicker value={typeId} onChange={setTypeId} />

      <SectionHeader title="How long?" className="mt-5" />
      <DurationPicker value={durationMin} onChange={setDurationMin} />

      <SectionHeader title="How hard?" className="mt-7" />
      <SegmentedControl<Intensity>
        value={intensity}
        onChange={setIntensity}
        options={[
          { label: "Easy", value: "easy", sublabel: "warm-up" },
          { label: "Moderate", value: "moderate", sublabel: "solid" },
          { label: "Hard", value: "hard", sublabel: "all-out" },
        ]}
      />

      <View className="mt-7">
        <ExtraToggle value={isExtra} onChange={setIsExtra} />
      </View>

      <View className="mt-8">
        <Button
          label={typeId ? "Finish session" : "Pick a training type"}
          size="lg"
          disabled={!typeId}
          onPress={onSubmit}
          icon={
            typeId ? (
              <Ionicons name="checkmark-circle" size={20} color={colors.pitch} />
            ) : undefined
          }
        />
      </View>
    </Screen>
  );
}
