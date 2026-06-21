import type { ReactNode } from "react";
import { Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  right?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, right, className }: SectionHeaderProps) {
  return (
    <View className={`mb-3 flex-row items-center justify-between ${className ?? ""}`}>
      <Text className="font-hud text-xs uppercase tracking-[0.2em] text-muted">{title}</Text>
      {right}
    </View>
  );
}
