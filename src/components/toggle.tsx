import React from "react";
import { Switch, SwitchProps } from "react-native";
import { colors } from "@/theme";

export interface ToggleProps extends Omit<SwitchProps, "trackColor" | "thumbColor"> {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Toggle({ value, onValueChange, ...props }: ToggleProps) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: colors.borderGray,
        true: colors.primary,
      }}
      thumbColor={colors.surfaceWhite}
      ios_backgroundColor={colors.borderGray}
      {...props}
    />
  );
}
