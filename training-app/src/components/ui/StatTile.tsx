import { Text, View } from "react-native";

interface StatTileProps {
  value: string;
  label: string;
  accentClass?: string; // e.g. "text-volt"
  className?: string;
}

export function StatTile({ value, label, accentClass = "text-chalk", className }: StatTileProps) {
  return (
    <View className={`rounded-2xl border border-line bg-surface px-4 py-3 ${className ?? ""}`}>
      <Text className={`font-display text-3xl ${accentClass}`}>{value}</Text>
      <Text className="mt-1 font-hud text-[11px] uppercase tracking-wider text-muted">{label}</Text>
    </View>
  );
}
