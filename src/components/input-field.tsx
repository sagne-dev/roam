import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Pressable,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, fonts } from "@/theme";

export interface InputFieldProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
}

export function InputField({
  leftIcon,
  rightIcon,
  containerStyle,
  isPassword = false,
  secureTextEntry,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.surfaceWhite,
          borderColor: isFocused ? colors.textPrimary : colors.borderGray,
          borderWidth: 1.5,
          borderRadius: radius.md,
          borderCurve: "continuous",
          paddingHorizontal: spacing.md,
          minHeight: 52,
          gap: spacing.sm,
        },
        containerStyle,
      ]}
    >
      {leftIcon && <View style={{ marginRight: spacing.xs }}>{leftIcon}</View>}

      <TextInput
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={isPassword ? !showPassword : secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          fontFamily: fonts.regular,
          fontSize: 16,
          color: colors.textPrimary,
          paddingVertical: 10,
        }}
        {...props}
      />

      {isPassword ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          onPress={() => setShowPassword(!showPassword)}
          hitSlop={8}
        >
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>
      ) : (
        rightIcon
      )}
    </View>
  );
}

