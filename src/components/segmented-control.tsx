import React from "react";
import { View, Pressable, ViewStyle, StyleProp } from "react-native";
import { colors, radius, spacing } from "@/theme";
import { ThemedText } from "./themed-text";

export interface SegmentItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  items: SegmentItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedControl({
  items,
  selectedId,
  onSelect,
  style,
}: SegmentedControlProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          backgroundColor: colors.darkSurface,
          borderRadius: radius.full,
          padding: 4,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <Pressable
            key={item.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={item.label}
            onPress={() => onSelect(item.id)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.xs,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: radius.full,
              backgroundColor: isSelected ? colors.darkSurfaceActive : "transparent",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            {item.icon}
            <ThemedText
              variant="caption"
              style={{
                color: isSelected ? colors.onDark : colors.textSecondary,
                fontWeight: isSelected ? "600" : "500",
              }}
            >
              {item.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

