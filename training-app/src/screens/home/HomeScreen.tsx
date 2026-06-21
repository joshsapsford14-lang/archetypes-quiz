import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import Animated, { FadeInDown, ReduceMotion } from "react-native-reanimated";

import { StreakDays } from "@/components/StreakDays";
import { Button, Card, Chip, ProgressRing, Screen, StatTile } from "@/components/ui";
import { DAILY_XP_GOAL } from "@/config";
import { addDays, sameDay, startOfWeek } from "@/lib/date";
import { GRADING } from "@/lib/grading";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { greeting, shortDate } from "@/lib/greeting";
import { levelFromXp, rankForLevel } from "@/lib/progression";
import {
  daysTrainedThisWeek,
  todayXp,
  totalXp,
  weeklyMinutes,
  weeklySessionCount,
  weeklyStreak,
  weeklyXp,
} from "@/lib/stats";
import { useGameStore } from "@/store/useGameStore";
import { colors } from "@/theme";

function formatMinutes(m: number): string {
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

const enter = (delay: number) =>
  FadeInDown.duration(420).delay(delay).reduceMotion(ReduceMotion.System);

export function HomeScreen() {
  const router = useRouter();
  const sessions = useGameStore((s) => s.sessions);

  const today = todayXp(sessions);
  const counted = useCountUp(today, { durationMs: 1100 });
  const ringProgress = today / DAILY_XP_GOAL;

  const streak = weeklyStreak(sessions);
  const daysThisWeek = daysTrainedThisWeek(sessions);
  const goalDays = GRADING.weeklyGoalDays;

  const level = levelFromXp(totalXp(sessions));
  const rank = rankForLevel(level.level);

  // Which weekdays (Mon..Sun) were trained this week.
  const weekStart = startOfWeek(new Date());
  const flags = Array.from({ length: 7 }, (_, i) =>
    sessions.some((s) => sameDay(new Date(s.createdAt), addDays(weekStart, i))),
  );
  const todayIndex = (new Date().getDay() + 6) % 7;

  const trainedToday = today > 0;
  const prompt = trainedToday
    ? "Beauty — you've trained today. Your squad can see the work. 👀"
    : "Your move. Log today's session and bank the XP. 👇";

  const streakSafe = daysThisWeek >= goalDays;
  const streakCopy = streakSafe
    ? "Weekly goal smashed — your streak is locked in. 🔥"
    : `Train ${goalDays - daysThisWeek} more day${goalDays - daysThisWeek === 1 ? "" : "s"} this week to keep your streak.`;

  return (
    <Screen>
      {/* Header */}
      <View className="mb-2 mt-1 flex-row items-start justify-between">
        <View>
          <Text className="font-hud text-xs uppercase tracking-[0.2em] text-muted">
            {greeting()}
          </Text>
          <Text className="mt-1 font-display text-4xl text-chalk">{shortDate()}</Text>
        </View>
        <View className="flex-row items-center gap-2 rounded-full border border-line bg-surface px-3 py-2">
          <Text style={{ fontSize: 15 }}>{rank.emoji}</Text>
          <View>
            <Text className="font-body-bold text-xs text-chalk">{rank.name}</Text>
            <Text className="font-hud text-[10px] text-muted">LVL {level.level}</Text>
          </View>
        </View>
      </View>

      {/* XP ring */}
      <Animated.View entering={enter(40)} className="items-center pt-4">
        <ProgressRing progress={ringProgress} size={240} strokeWidth={18}>
          <View className="items-center">
            <Text className="font-hud text-[11px] uppercase tracking-[0.25em] text-muted">
              Today
            </Text>
            <Text className="font-display text-7xl text-volt" style={{ lineHeight: 76 }}>
              {counted}
            </Text>
            <Text className="font-hud text-xs text-muted">/ {DAILY_XP_GOAL} XP</Text>
          </View>
        </ProgressRing>
        <Text className="mt-5 px-6 text-center font-body text-base text-chalk">{prompt}</Text>
      </Animated.View>

      {/* Primary action */}
      <Animated.View entering={enter(120)} className="mt-6">
        <Button
          label="Log a session"
          size="lg"
          onPress={() => router.push("/log")}
          icon={<Ionicons name="football" size={20} color={colors.pitch} />}
        />
      </Animated.View>

      {/* Streak */}
      <Animated.View entering={enter(200)}>
        <Card className="mt-6 p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Ionicons name="flame" size={22} color={colors.volt} />
              <Text className="font-display text-2xl text-chalk">
                {streak}-week streak
              </Text>
            </View>
            <Chip
              label={`${daysThisWeek}/${goalDays} days`}
              className={streakSafe ? "border-volt bg-surface-2" : "border-line bg-surface-2"}
              textClassName={streakSafe ? "text-volt" : "text-muted"}
            />
          </View>
          <StreakDays flags={flags} todayIndex={todayIndex} />
          <Text className="mt-3 font-body text-sm text-muted">{streakCopy}</Text>
        </Card>
      </Animated.View>

      {/* This week */}
      <Animated.View entering={enter(280)} className="mt-4 flex-row gap-3">
        <StatTile
          className="flex-1"
          value={String(weeklySessionCount(sessions))}
          label="Sessions"
        />
        <StatTile
          className="flex-1"
          value={formatMinutes(weeklyMinutes(sessions))}
          label="This week"
          accentClass="text-aqua"
        />
        <StatTile
          className="flex-1"
          value={String(weeklyXp(sessions))}
          label="XP"
          accentClass="text-volt"
        />
      </Animated.View>
    </Screen>
  );
}
