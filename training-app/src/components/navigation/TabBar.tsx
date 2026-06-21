import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Tabs, useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PressableScale } from "@/components/ui";
import { colors } from "@/theme";

type IoniconName = keyof typeof Ionicons.glyphMap;

interface TabDef {
  route: string;
  label: string;
  icon: IoniconName;
  iconActive: IoniconName;
}

// Tab routes split around the central Log FAB (2 left, 2 right).
const LEFT: TabDef[] = [
  { route: "index", label: "Today", icon: "today-outline", iconActive: "today" },
  { route: "squad", label: "Squad", icon: "people-outline", iconActive: "people" },
];
const RIGHT: TabDef[] = [
  { route: "progress", label: "Progress", icon: "trending-up-outline", iconActive: "trending-up" },
  { route: "profile", label: "Profile", icon: "person-outline", iconActive: "person" },
];

// Derive the tab-bar prop type from Tabs itself (Expo Router vendors react-navigation).
type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>["tabBar"]>>[0];

export function TabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const activeRoute = state.routes[state.index]?.name;

  const onPressTab = (route: string) => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    navigation.navigate(route);
  };

  const onPressLog = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/log");
  };

  const renderTab = (tab: TabDef) => {
    const focused = activeRoute === tab.route;
    return (
      <Pressable
        key={tab.route}
        onPress={() => onPressTab(tab.route)}
        className="flex-1 items-center justify-center"
      >
        <Ionicons
          name={focused ? tab.iconActive : tab.icon}
          size={23}
          color={focused ? colors.volt : colors.muted}
        />
        <Text
          className="mt-1 font-hud text-[10px] tracking-wide"
          style={{ color: focused ? colors.volt : colors.muted }}
        >
          {tab.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{ position: "absolute", left: 16, right: 16, bottom: insets.bottom + 8 }}
      pointerEvents="box-none"
    >
      <View
        className="flex-row items-center rounded-[26px] border border-line bg-surface"
        style={{ height: 66, paddingHorizontal: 8 }}
      >
        {LEFT.map(renderTab)}

        {/* Center Log FAB — the dopamine action, raised above the bar. */}
        <View className="items-center justify-center" style={{ width: 76 }}>
          <PressableScale
            onPress={onPressLog}
            pressedScale={0.92}
            className="items-center justify-center rounded-full bg-volt"
            style={{
              width: 62,
              height: 62,
              marginTop: -26,
              shadowColor: colors.volt,
              shadowOpacity: 0.5,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 6 },
              elevation: 8,
            }}
          >
            <Ionicons name="add" size={34} color={colors.pitch} />
          </PressableScale>
          <Text className="mt-1 font-hud text-[10px] tracking-wide text-volt">Log</Text>
        </View>

        {RIGHT.map(renderTab)}
      </View>
    </View>
  );
}
