import React from "react";
import { View, Pressable, ViewStyle, StyleProp } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, fonts } from "@/theme";
import { ThemedText } from "./themed-text";

export interface TabItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon?: keyof typeof Ionicons.glyphMap;
}

export interface LiquidGlassTabBarProps {
  tabs?: TabItem[];
  activeTabId?: string;
  onTabPress?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

const defaultTabs: TabItem[] = [
  { id: "home", label: "Home", icon: "home-outline", activeIcon: "home" },
  { id: "search", label: "Search", icon: "search-outline", activeIcon: "search" },
  { id: "trips", label: "Trips", icon: "calendar-outline", activeIcon: "calendar" },
  { id: "profile", label: "Profile", icon: "person-outline", activeIcon: "person" },
];

export function LiquidGlassTabBar({
  tabs = defaultTabs,
  activeTabId = "home",
  onTabPress,
  style,
}: LiquidGlassTabBarProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          borderRadius: radius.full,
          paddingVertical: 6,
          paddingHorizontal: 8,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          minHeight: 80,
        },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
            onPress={() => onTabPress?.(tab.id)}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            {isActive ? (
              <View
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 33,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                <Ionicons
                  name={tab.activeIcon || tab.icon}
                  size={24}
                  color={colors.textPrimary}
                />
                <ThemedText
                  variant="caption"
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 12,
                    lineHeight: 14,
                    color: colors.textPrimary,
                  }}
                >
                  {tab.label}
                </ThemedText>
              </View>
            ) : (
              <View
                style={{
                  width: 66,
                  height: 66,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                <Ionicons
                  name={tab.icon}
                  size={24}
                  color={colors.textPrimary}
                />
                <ThemedText
                  variant="caption"
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: 12,
                    lineHeight: 14,
                    color: colors.textPrimary,
                  }}
                >
                  {tab.label}
                </ThemedText>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
