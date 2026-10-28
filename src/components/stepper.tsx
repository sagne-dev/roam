import React from "react";
import { View, Pressable, ViewStyle, StyleProp } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "@/theme";
import { ThemedText } from "./themed-text";

export interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
}

export function Stepper({
  value,
  min = 0,
  max = 99,
  onChange,
  style,
}: StepperProps) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.md,
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrement"
        accessibilityState={{ disabled: !canDecrement }}
        disabled={!canDecrement}
        onPress={() => onChange(value - 1)}
        hitSlop={8}
        style={({ pressed }) => ({
          width: 32,
          height: 32,
          borderRadius: radius.full,
          borderWidth: 1,
          borderColor: colors.borderGray,
          alignItems: "center",
          justifyContent: "center",
          opacity: !canDecrement ? 0.3 : pressed ? 0.6 : 1,
          backgroundColor: colors.surfaceWhite,
        })}
      >
        <Ionicons name="remove" size={16} color={colors.textPrimary} />
      </Pressable>

      <ThemedText
        variant="button"
        style={{
          minWidth: 20,
          textAlign: "center",
          color: colors.textPrimary,
        }}
      >
        {value}
      </ThemedText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increment"
        accessibilityState={{ disabled: !canIncrement }}
        disabled={!canIncrement}
        onPress={() => onChange(value + 1)}
        hitSlop={8}
        style={({ pressed }) => ({
          width: 32,
          height: 32,
          borderRadius: radius.full,
          borderWidth: 1,
          borderColor: colors.borderGray,
          alignItems: "center",
          justifyContent: "center",
          opacity: !canIncrement ? 0.3 : pressed ? 0.6 : 1,
          backgroundColor: colors.surfaceWhite,
        })}
      >
        <Ionicons name="add" size={16} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

