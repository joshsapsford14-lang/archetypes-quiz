import { Text, View } from "react-native";

import { PressableScale } from "./PressableScale";

export interface SegmentOption<T> {
  label: string;
  value: T;
  sublabel?: string;
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <View className={`flex-row rounded-2xl border border-line bg-surface p-1 ${className ?? ""}`}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <PressableScale
            key={String(opt.value)}
            className={`flex-1 items-center rounded-xl py-2.5 ${active ? "bg-volt" : ""}`}
            pressedScale={0.97}
            onPress={() => onChange(opt.value)}
          >
            <Text className={`font-body-bold text-sm ${active ? "text-pitch" : "text-chalk"}`}>
              {opt.label}
            </Text>
            {opt.sublabel ? (
              <Text className={`mt-0.5 font-hud text-[10px] ${active ? "text-pitch" : "text-muted"}`}>
                {opt.sublabel}
              </Text>
            ) : null}
          </PressableScale>
        );
      })}
    </View>
  );
}
