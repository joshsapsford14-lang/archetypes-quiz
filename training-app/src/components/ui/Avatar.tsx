import { Text, View } from "react-native";

interface AvatarProps {
  initials: string;
  color: string;
  size?: number;
  highlight?: boolean; // ring around "you"
}

export function Avatar({ initials, color, size = 44, highlight }: AvatarProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: `${color}22`,
        borderWidth: highlight ? 2 : 1,
        borderColor: highlight ? color : `${color}55`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color, fontFamily: "DMSans-Bold", fontSize: size * 0.36 }}>{initials}</Text>
    </View>
  );
}
