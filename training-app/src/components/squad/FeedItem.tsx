import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Avatar, PressableScale } from "@/components/ui";
import { getTrainingType } from "@/data/trainingTypes";
import { relativeLabel } from "@/lib/date";
import { colors } from "@/theme";
import type { Friend } from "@/types";

interface FeedItemProps {
  friend: Friend;
  hasKudos: boolean;
  onKudos: () => void;
}

export function FeedItem({ friend, hasKudos, onKudos }: FeedItemProps) {
  const activity = friend.activity;
  if (!activity) return null;
  const type = getTrainingType(activity.typeId);
  const count = activity.kudos + (hasKudos ? 1 : 0);

  return (
    <View className="flex-row items-center py-3">
      <Avatar initials={friend.initials} color={friend.avatarColor} size={42} />
      <View className="ml-3 flex-1 pr-2">
        <Text className="font-body text-sm text-chalk">
          <Text className="font-body-bold text-chalk">{friend.name}</Text> did{" "}
          {activity.durationMin}m of {type.label.toLowerCase()} {type.emoji}
          {activity.isExtra ? "  ·  extra 🚀" : ""}
        </Text>
        <Text className="mt-0.5 font-hud text-[11px] text-muted">
          {relativeLabel(activity.createdAt)}
        </Text>
      </View>
      <PressableScale
        onPress={onKudos}
        pressedScale={0.85}
        className={`flex-row items-center gap-1 rounded-full border px-3 py-1.5 ${
          hasKudos ? "border-volt bg-surface-2" : "border-line"
        }`}
      >
        <Ionicons
          name={hasKudos ? "flame" : "flame-outline"}
          size={16}
          color={hasKudos ? colors.volt : colors.muted}
        />
        <Text className="font-hud text-xs" style={{ color: hasKudos ? colors.volt : colors.muted }}>
          {count}
        </Text>
      </PressableScale>
    </View>
  );
}
