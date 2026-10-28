import React from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { colors, radius } from "@/theme";
import { ThemedText } from "./themed-text";

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function FilterChip({
  label,
  selected = false,
  onPress,
  style,
}: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        {
          paddingVertical: 10,
          paddingHorizontal: 18,
          borderRadius: radius.full,
          backgroundColor: selected ? colors.lavender : colors.surfaceWhite,
          borderColor: selected ? colors.lavender : colors.borderGray,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <ThemedText
        variant="caption"
        style={{
          color: colors.textPrimary,
          fontWeight: selected ? "600" : "500",
        }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}
