import React from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { colors, radius } from "@/theme";

export type IconButtonVariant = "outline" | "glass" | "ghost" | "filled";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps {
  icon: React.ReactNode;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const variants = {
  outline: {
    backgroundColor: colors.surfaceWhite,
    borderColor: colors.borderGray,
    borderWidth: 1,
  },
  glass: {
    backgroundColor: colors.glassBlurOverlay,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
  },
  filled: {
    backgroundColor: colors.primary,
    borderColor: "transparent",
    borderWidth: 0,
  },
} as const;

const sizes = {
  sm: {
    width: 36,
    height: 36,
  },
  md: {
    width: 44,
    height: 44,
  },
  lg: {
    width: 52,
    height: 52,
  },
} as const;

export function IconButton({
  icon,
  accessibilityLabel,
  variant = "outline",
  size = "md",
  disabled = false,
  style,
  onPress,
}: IconButtonProps) {
  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: currentSize.width,
          height: currentSize.height,
          borderRadius: radius.full,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: currentVariant.backgroundColor,
          borderColor: currentVariant.borderColor,
          borderWidth: currentVariant.borderWidth,
          opacity: disabled ? 0.4 : pressed ? 0.75 : 1,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}

