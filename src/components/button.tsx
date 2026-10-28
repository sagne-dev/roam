import React from "react";
import {
  Pressable,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  View,
} from "react-native";
import { colors, radius, spacing } from "@/theme";
import { ThemedText } from "./themed-text";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const variants = {
  primary: {
    backgroundColor: colors.primary,
    borderColor: "transparent",
    borderWidth: 0,
    textColor: colors.textPrimary,
  },
  secondary: {
    backgroundColor: colors.surfaceWhite,
    borderColor: colors.borderGray,
    borderWidth: 1,
    textColor: colors.textPrimary,
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    textColor: colors.textPrimary,
  },
} as const;

const sizes = {
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
    textVariant: "caption" as const,
    gap: spacing.xs,
  },
  md: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
    textVariant: "button" as const,
    gap: spacing.sm,
  },
  lg: {
    paddingVertical: 18,
    paddingHorizontal: spacing.xl,
    minHeight: 60,
    textVariant: "button" as const,
    gap: spacing.sm,
  },
} as const;

export function Button({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  onPress,
}: ButtonProps) {
  const currentVariant = variants[variant];
  const currentSize = sizes[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: currentVariant.backgroundColor,
          borderColor: currentVariant.borderColor,
          borderWidth: currentVariant.borderWidth,
          borderRadius: radius.full,
          opacity: isDisabled ? 0.45 : pressed ? 0.8 : 1,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          minHeight: currentSize.minHeight,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={currentVariant.textColor} size="small" />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", gap: currentSize.gap }}>
          {leftIcon}
          <ThemedText
            variant={currentSize.textVariant}
            style={{ color: currentVariant.textColor, fontWeight: "600" }}
          >
            {title}
          </ThemedText>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}

