import React from "react";
import { View, Pressable, ViewStyle, StyleProp } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "@/theme";
import { ThemedText } from "./themed-text";

export type AlertType = "success" | "error";

export interface AlertBannerProps {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

const config = {
  success: {
    backgroundColor: colors.successBackground,
    borderColor: colors.successBorder,
    icon: "checkmark-circle" as const,
    iconColor: colors.success,
    textColor: "#065F46",
  },
  error: {
    backgroundColor: colors.errorBackground,
    borderColor: colors.errorBorder,
    icon: "alert-circle" as const,
    iconColor: colors.error,
    textColor: "#991B1B",
  },
} as const;

export function AlertBanner({
  type,
  message,
  onDismiss,
  style,
}: AlertBannerProps) {
  const current = config[type];

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: current.backgroundColor,
          borderColor: current.borderColor,
          borderWidth: 1,
          borderRadius: radius.md,
          borderCurve: "continuous",
          paddingVertical: 12,
          paddingHorizontal: spacing.md,
          gap: spacing.sm,
        },
        style,
      ]}
    >
      <Ionicons name={current.icon} size={20} color={current.iconColor} />

      <ThemedText
        variant="caption"
        style={{
          flex: 1,
          color: current.textColor,
          fontWeight: "500",
        }}
      >
        {message}
      </ThemedText>

      {onDismiss && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
          onPress={onDismiss}
          hitSlop={8}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Ionicons name="close" size={18} color={current.textColor} />
        </Pressable>
      )}
    </View>
  );
}

