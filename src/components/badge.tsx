import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import { colors, radius } from "@/theme";
import { ThemedText } from "./themed-text";

export type BadgeVariant =
  | "favorite"
  | "new"
  | "discount"
  | "superhost"
  | "amenity"
  | "neutral";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const variantStyles = {
  favorite: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    textColor: colors.textPrimary,
  },
  new: {
    backgroundColor: colors.successBackground,
    borderColor: colors.successBorder,
    borderWidth: 1,
    textColor: colors.success,
  },
  discount: {
    backgroundColor: colors.errorBackground,
    borderColor: colors.errorBorder,
    borderWidth: 1,
    textColor: colors.error,
  },
  superhost: {
    backgroundColor: colors.infoBackground,
    borderColor: "#BFDBFE",
    borderWidth: 1,
    textColor: colors.info,
  },
  amenity: {
    backgroundColor: colors.surfaceGray,
    borderColor: "transparent",
    borderWidth: 0,
    textColor: colors.textPrimary,
  },
  neutral: {
    backgroundColor: colors.surfaceGray,
    borderColor: colors.borderGray,
    borderWidth: 1,
    textColor: colors.textSecondary,
  },
} as const;

export function Badge({
  label,
  variant = "neutral",
  icon,
  style,
}: BadgeProps) {
  const current = variantStyles[variant];

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: radius.sm,
          borderCurve: "continuous",
          backgroundColor: current.backgroundColor,
          borderColor: current.borderColor,
          borderWidth: current.borderWidth,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      {icon}
      <ThemedText
        variant="small"
        style={{
          color: current.textColor,
          fontWeight: "600",
        }}
      >
        {label}
      </ThemedText>
    </View>
  );
}
