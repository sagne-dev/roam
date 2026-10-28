import React from "react";
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

export interface SearchInputProps extends TextInputProps {
  onFilterPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export function SearchInput({
  onFilterPress,
  containerStyle,
  ...props
}: SearchInputProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.surfaceWhite,
          borderColor: colors.borderGray,
          borderWidth: 1,
          borderRadius: radius.full,
          paddingHorizontal: spacing.md,
          minHeight: 52,
          gap: spacing.sm,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        },
        containerStyle,
      ]}
    >
      <Ionicons name="search" size={20} color={colors.textPrimary} />

      <TextInput
        placeholder="Cabins in California"
        placeholderTextColor={colors.textSecondary}
        style={{
          flex: 1,
          fontFamily: fonts.medium,
          fontSize: 16,
          color: colors.textPrimary,
          paddingVertical: 10,
        }}
        {...props}
      />

      {onFilterPress && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open filters"
          onPress={onFilterPress}
          hitSlop={8}
          style={({ pressed }) => ({
            padding: spacing.xs,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Ionicons name="options-outline" size={20} color={colors.textPrimary} />
        </Pressable>
      )}
    </View>
  );
}

