import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { RankLadder } from "@/components/progress/RankLadder";
import { Card, Screen, SectionHeader, StatTile, XpBar } from "@/components/ui";
import { levelFromXp, rankForLevel } from "@/lib/progression";
import type { BalanceTone } from "@/lib/stats";
import { totalXp, trainingBalance, weeklySummary } from "@/lib/stats";
import { useGameStore } from "@/store/useGameStore";
import { colors } from "@/theme";

function formatMinutes(m: number): string {
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

const BALANCE: Record<
  BalanceTone,
  { icon: keyof typeof Ionicons.glyphMap; color: string; text: string }
> = {
  balanced: { icon: "checkmark-circle", color: colors.volt, text: "text-volt" },
  mix: { icon: "shuffle", color: colors.aqua, text: "text-aqua" },
  rest: { icon: "bed", color: colors.flame, text: "text-flame" },
};

export function ProgressScreen() {
  const sessions = useGameStore((s) => s.sessions);

  const level = levelFromXp(totalXp(sessions));
  const rank = rankForLevel(level.level);
  const summary = weeklySummary(sessions);
  const balance = trainingBalance(sessions);
  const balanceStyle = BALANCE[balance.tone];

  return (
    <Screen>
      <Text className="mb-1 mt-1 font-display text-4xl text-chalk">Progress</Text>

      {/* Level card */}
      <Card className="mt-4 p-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="font-hud text-[11px] uppercase tracking-widest text-muted">
              Current rank
            </Text>
            <Text className="mt-1 font-display text-3xl text-chalk">
              {rank.emoji} {rank.name}
            </Text>
          </View>
          <View className="items-center">
            <Text className="font-hud text-[10px] tracking-widest text-muted">LEVEL</Text>
            <Text className="font-display text-6xl text-volt" style={{ lineHeight: 64 }}>
              {level.level}
            </Text>
          </View>
        </View>
        <View className="mt-4">
          <XpBar progress={level.progress} />
          <Text className="mt-2 font-hud text-xs text-muted">
            {level.xpIntoLevel} / {level.xpForNext} XP to Level {level.level + 1}
          </Text>
        </View>
      </Card>

      {/* Weekly summary */}
      <SectionHeader title="This week" className="mt-6" />
      <View className="flex-row gap-3">
        <StatTile className="flex-1" value={formatMinutes(summary.minutes)} label="Trained" accentClass="text-aqua" />
        <StatTile className="flex-1" value={String(summary.sessions)} label="Sessions" />
        <StatTile className="flex-1" value={String(summary.xp)} label="XP" accentClass="text-volt" />
      </View>
      <View className="mt-3 flex-row gap-3">
        <StatTile
          className="flex-1"
          value={`${summary.daysTrained}/${summary.goalDays}`}
          label="Days (goal)"
        />
        <StatTile
          className="flex-1"
          value={`${summary.bestStreak}w`}
          label="Best streak"
          accentClass="text-flame"
        />
      </View>

      {/* Training balance */}
      <SectionHeader title="Training balance" className="mt-6" />
      <Card className="flex-row items-start gap-3 p-4">
        <Ionicons name={balanceStyle.icon} size={22} color={balanceStyle.color} />
        <View className="flex-1">
          <Text className={`font-body-bold text-base ${balanceStyle.text}`}>{balance.title}</Text>
          <Text className="mt-1 font-body text-sm leading-5 text-muted">{balance.message}</Text>
        </View>
      </Card>

      {/* Rank ladder */}
      <SectionHeader title="The climb" className="mt-6" />
      <RankLadder level={level.level} currentRankId={rank.id} />
    </Screen>
  );
}
