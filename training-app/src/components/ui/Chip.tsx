import { Text, View } from "react-native";

interface ChipProps {
  label: string;
  className?: string;
  textClassName?: string;
}

export function Chip({ label, className, textClassName }: ChipProps) {
  return (
    <View className={`self-start rounded-full border px-3 py-1 ${className ?? "border-line bg-surface-2"}`}>
      <Text
        className={`font-hud text-[11px] uppercase tracking-wider ${textClassName ?? "text-muted"}`}
      >
        {label}
      </Text>
    </View>
  );
}
