import React from "react";
import { View, Pressable, ViewStyle, StyleProp } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "@/theme";
import { ThemedText } from "./themed-text";
import { IconButton } from "./icon-button";
import { Badge } from "./badge";

export interface ListingCardProps {
  imageUrl: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities?: string[];
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ListingCard({
  imageUrl,
  title,
  location,
  rating,
  reviewCount,
  pricePerNight,
  amenities = ["Hot Tub", "Pet Friendly"],
  isFavorite = false,
  onFavoritePress,
  onPress,
  style,
}: ListingCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, in ${location}, $${pricePerNight} per night, rated ${rating}`}
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surfaceWhite,
          borderRadius: radius.lg,
          borderCurve: "continuous",
          overflow: "hidden",
          gap: spacing.sm,
          opacity: pressed ? 0.95 : 1,
        },
        style,
      ]}
    >
      {/* Image container with floating favorite button */}
      <View
        style={{
          position: "relative",
          width: "100%",
          height: 200,
          borderRadius: radius.lg,
          borderCurve: "continuous",
          overflow: "hidden",
          backgroundColor: colors.surfaceGray,
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={200}
        />

        <View
          style={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          <IconButton
            variant="glass"
            size="sm"
            accessibilityLabel={isFavorite ? "Remove from favorites" : "Save to favorites"}
            onPress={onFavoritePress}
            icon={
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={18}
                color={isFavorite ? colors.error : colors.textPrimary}
              />
            }
          />
        </View>
      </View>

      {/* Stay details */}
      <View style={{ gap: 4, paddingHorizontal: 2 }}>
        <ThemedText variant="title" style={{ fontSize: 18, lineHeight: 24 }}>
          {title}
        </ThemedText>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <ThemedText variant="caption">{location}</ThemedText>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
          <Ionicons name="star" size={14} color={colors.ratingStar} />
          <ThemedText
            variant="caption"
            style={{ fontWeight: "700", color: colors.textPrimary }}
          >
            {rating.toFixed(1)}
          </ThemedText>
          <ThemedText variant="caption">({reviewCount})</ThemedText>
        </View>

        {/* Amenity Badges */}
        {amenities.length > 0 && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
            {amenities.map((amenity) => (
              <Badge
                key={amenity}
                variant="amenity"
                label={amenity}
                icon={
                  amenity.toLowerCase().includes("pet") ? (
                    <Ionicons name="paw-outline" size={12} color={colors.textSecondary} />
                  ) : (
                    <Ionicons name="water-outline" size={12} color={colors.textSecondary} />
                  )
                }
              />
            ))}
          </View>
        )}

        {/* Pricing */}
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4, marginTop: 4 }}>
          <ThemedText
            variant="title"
            style={{ fontSize: 18, lineHeight: 24, fontWeight: "700" }}
          >
            ${pricePerNight}
          </ThemedText>
          <ThemedText variant="caption">/ night</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

