import { useMemo } from "react";
import { Text, View } from "react-native";

import { FeedItem } from "@/components/squad/FeedItem";
import { LeaderboardRow } from "@/components/squad/LeaderboardRow";
import { Card, Screen, SectionHeader } from "@/components/ui";
import { MOCK_FRIENDS } from "@/data/mockFriends";
import { levelFromXp } from "@/lib/progression";
import { totalXp, weeklyXp } from "@/lib/stats";
import { useGameStore } from "@/store/useGameStore";
import { colors } from "@/theme";

interface BoardRow {
  id: string;
  name: string;
  initials: string;
  color: string;
  level: number;
  weeklyXp: number;
  isYou: boolean;
}

export function SquadScreen() {
  const sessions = useGameStore((s) => s.sessions);
  const kudos = useGameStore((s) => s.kudos);
  const toggleKudos = useGameStore((s) => s.toggleKudos);

  const youWeekly = weeklyXp(sessions);
  const youLevel = levelFromXp(totalXp(sessions)).level;

  const board: BoardRow[] = useMemo(() => {
    const rows: BoardRow[] = MOCK_FRIENDS.map((f) => ({
      id: f.id,
      name: f.name,
      initials: f.initials,
      color: f.avatarColor,
      level: f.level,
      weeklyXp: f.weeklyXp,
      isYou: false,
    }));
    rows.push({
      id: "you",
      name: "You",
      initials: "YOU",
      color: colors.volt,
      level: youLevel,
      weeklyXp: youWeekly,
      isYou: true,
    });
    return rows.sort((a, b) => b.weeklyXp - a.weeklyXp);
  }, [youWeekly, youLevel]);

  const feed = useMemo(
    () =>
      MOCK_FRIENDS.filter((f) => f.activity).sort(
        (a, b) =>
          new Date(b.activity!.createdAt).getTime() -
          new Date(a.activity!.createdAt).getTime(),
      ),
    [],
  );

  return (
    <Screen>
      <View className="mb-1 mt-1">
        <Text className="font-display text-4xl text-chalk">Squad</Text>
        <Text className="mt-1 font-body text-muted">
          Your crew this week — keep up or get left behind 😤
        </Text>
      </View>

      <SectionHeader title="Leaderboard · this week" className="mt-6" />
      <Card className="p-2">
        {board.map((row, i) => (
          <LeaderboardRow
            key={row.id}
            position={i + 1}
            name={row.name}
            initials={row.initials}
            color={row.color}
            level={row.level}
            weeklyXp={row.weeklyXp}
            isYou={row.isYou}
          />
        ))}
      </Card>

      <SectionHeader title="Recent activity" className="mt-6" />
      <Card className="px-4">
        {feed.map((friend, i) => (
          <View key={friend.id} className={i > 0 ? "border-t border-line" : ""}>
            <FeedItem
              friend={friend}
              hasKudos={!!kudos[friend.activity!.id]}
              onKudos={() => toggleKudos(friend.activity!.id)}
            />
          </View>
        ))}
      </Card>
    </Screen>
  );
}
