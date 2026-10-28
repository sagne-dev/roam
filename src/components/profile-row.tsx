import React from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/theme";
import { ThemedText } from "./themed-text";

export interface ProfileRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ProfileRow({ icon, title, onPress, style }: ProfileRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 14,
          paddingHorizontal: spacing.sm,
          gap: spacing.md,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Ionicons name={icon} size={22} color={colors.textPrimary} />

      <ThemedText
        variant="bodyMedium"
        style={{
          flex: 1,
          color: colors.textPrimary,
        }}
      >
        {title}
      </ThemedText>

      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>
  );
}
