import { useState } from "react";
import { Text, View } from "react-native";

import { Avatar, Button, Card, Screen, SectionHeader, StatTile } from "@/components/ui";
import { APP_NAME } from "@/config";
import { levelFromXp, rankForLevel } from "@/lib/progression";
import { totalXp } from "@/lib/stats";
import { useGameStore } from "@/store/useGameStore";
import { colors } from "@/theme";

function formatMinutes(m: number): string {
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

export function ProfileScreen() {
  const sessions = useGameStore((s) => s.sessions);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const [confirm, setConfirm] = useState(false);

  const total = totalXp(sessions);
  const level = levelFromXp(total);
  const rank = rankForLevel(level.level);
  const minutes = sessions.reduce((sum, s) => sum + s.durationMin, 0);

  return (
    <Screen>
      <Text className="mb-4 mt-1 font-display text-4xl text-chalk">Profile</Text>

      <Card className="items-center p-6">
        <Avatar initials="YOU" color={colors.volt} size={72} highlight />
        <Text className="mt-3 font-display text-3xl text-chalk">You</Text>
        <Text className="mt-1 font-body text-muted">
          {rank.emoji} {rank.name} · Level {level.level}
        </Text>
      </Card>

      <SectionHeader title="All time" className="mt-6" />
      <View className="flex-row gap-3">
        <StatTile className="flex-1" value={String(total)} label="Total XP" accentClass="text-volt" />
        <StatTile className="flex-1" value={String(sessions.length)} label="Sessions" />
        <StatTile className="flex-1" value={formatMinutes(minutes)} label="Trained" accentClass="text-aqua" />
      </View>

      <SectionHeader title="About" className="mt-6" />
      <Card className="p-4">
        <Text className="font-body text-sm leading-5 text-chalk">
          {APP_NAME} is a beta. It's running on local mock data so you can feel the full
          experience — XP, streaks, grades, and your squad. Real accounts and a live leaderboard
          (Supabase) are next.
        </Text>
      </Card>

      <View className="mt-6">
        <Button
          label={confirm ? "Tap again to reset everything" : "Reset demo data"}
          variant={confirm ? "primary" : "secondary"}
          onPress={() => {
            if (confirm) {
              resetProgress();
              setConfirm(false);
            } else {
              setConfirm(true);
            }
          }}
        />
        {confirm ? (
          <Text className="mt-2 text-center font-body text-xs text-muted">
            This clears your logged sessions and restores the demo history.
          </Text>
        ) : null}
      </View>
    </Screen>
  );
}
