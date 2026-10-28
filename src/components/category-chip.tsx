import React from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { colors, radius, spacing } from "@/theme";
import { ThemedText } from "./themed-text";

export interface CategoryChipProps {
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function CategoryChip({
  label,
  icon,
  selected = false,
  onPress,
  style,
}: CategoryChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.xs,
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: radius.full,
          backgroundColor: selected ? colors.primary : colors.surfaceWhite,
          borderColor: selected ? colors.primary : colors.borderGray,
          borderWidth: 1,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      {icon}
      <ThemedText
        variant="caption"
        style={{
          color: selected ? colors.textPrimary : colors.textSecondary,
          fontWeight: selected ? "600" : "500",
        }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

