import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  /** Extra classes for the content container (non-scroll) view. */
  contentClassName?: string;
}

/** Safe-area screen wrapper on the pitch background. Scroll padding clears the
 *  floating tab bar. */
export function Screen({ children, scroll = true, contentClassName }: ScreenProps) {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-pitch">
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 132 }}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={`flex-1 px-5 ${contentClassName ?? ""}`}>{children}</View>
      )}
    </SafeAreaView>
  );
}
