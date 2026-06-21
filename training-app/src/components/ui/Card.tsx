import { View, type ViewProps } from "react-native";

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <View className={`rounded-2xl border border-line bg-surface ${className ?? ""}`} {...rest}>
      {children}
    </View>
  );
}
