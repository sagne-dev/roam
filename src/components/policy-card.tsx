import React from "react";
import { View, Pressable, ViewStyle, StyleProp } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "@/theme";
import { ThemedText } from "./themed-text";

export interface PolicyCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function PolicyCard({
  icon,
  title,
  description,
  onPress,
  style,
}: PolicyCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${description}`}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.surfaceWhite,
          borderColor: colors.borderGray,
          borderWidth: 1,
          borderRadius: radius.lg,
          borderCurve: "continuous",
          padding: spacing.md,
          gap: spacing.md,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: radius.full,
          backgroundColor: colors.lavenderTint,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} size={22} color={colors.lavenderDark} />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <ThemedText variant="title" style={{ fontSize: 16, lineHeight: 22 }}>
          {title}
        </ThemedText>
        <ThemedText variant="caption" numberOfLines={2}>
          {description}
        </ThemedText>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>
  );
}

