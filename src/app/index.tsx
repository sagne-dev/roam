import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts, radius } from "@/theme";
import { GoogleIcon } from "@/components";

interface OnboardingSlide {
  id: string;
  location: string;
  imageUrl: string;
  alt: string;
}

// 3 curated high-resolution Unsplash destinations: alpine mountain cabin, Mediterranean coastal villa, secluded desert retreat
const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "whistler",
    location: "Whistler, BC",
    imageUrl:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
    alt: "Whistler mountain cabin with warm lighting at sunset by the lake",
  },
  {
    id: "amalfi",
    location: "Amalfi, Italy",
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85",
    alt: "Amalfi coast cliffside villa overlooking the Mediterranean Sea at dusk",
  },
  {
    id: "joshua-tree",
    location: "Joshua Tree, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=85",
    alt: "Secluded warm illuminated architectural cabin in the desert at twilight",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    if (index >= 0 && index < ONBOARDING_SLIDES.length) {
      setActiveIndex(index);
    }
  };

  const handleGetStarted = () => {
    router.push("/(auth)/sign-up");
  };

  const handleContinueWithGoogle = () => {
    router.push("/(auth)/sign-in");
  };

  const handleSkip = () => {
    // Skip onboarding directly into guest exploration mode
    router.push("/design-system");
  };

  const currentSlide = ONBOARDING_SLIDES[activeIndex] ?? ONBOARDING_SLIDES[0];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top Hero Section with Horizontal Swiper */}
      <View style={styles.heroWrapper}>
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          onMomentumScrollEnd={handleMomentumScrollEnd}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth, height: "100%" }}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.heroImage}
                contentFit="cover"
                transition={250}
                priority="high"
                accessibilityLabel={item.alt}
              />
            </View>
          )}
        />

        {/* Top Header Navigation Overlay */}
        <SafeAreaView edges={["top"]} style={styles.headerSafeArea} pointerEvents="box-none">
          <View style={styles.headerBar}>
            {/* roam Logo Wordmark */}
            <Text style={styles.logoText}>roam</Text>

            {/* Skip Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Skip onboarding"
              onPress={handleSkip}
              style={({ pressed }) => [
                styles.skipButton,
                { opacity: pressed ? 0.75 : 1 },
              ]}
              hitSlop={8}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </Pressable>
          </View>
        </SafeAreaView>

        {/* Floating Controls: Location Tag and Pagination Indicator */}
        <View style={styles.floatingControls} pointerEvents="box-none">
          {/* Dynamic Location Pill */}
          <View style={styles.locationPill}>
            <Ionicons
              name="location-sharp"
              size={14}
              color="#FFFFFF"
              style={styles.locationIcon}
            />
            <Text style={styles.locationPillText}>{currentSlide.location}</Text>
          </View>

          {/* Carousel Pagination Dots */}
          <View style={styles.dotsPill}>
            {ONBOARDING_SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <View
                  key={slide.id}
                  style={[
                    styles.dot,
                    isActive ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              );
            })}
          </View>
        </View>
      </View>

      {/* Bottom Sheet Card */}
      <View
        style={[
          styles.bottomSheet,
          {
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
      >
        {/* Lavender Accent Indicator */}
        <View style={styles.lavenderIndicator} />

        {/* Headline */}
        <Text style={styles.headline}>
          Find a stay that{"\n"}fits your story
        </Text>

        {/* Subtitle / Description */}
        <Text style={styles.subtitle}>
          From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip.
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* Primary CTA: Get started with right arrow */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get started"
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.primaryButton,
              { opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] },
            ]}
          >
            <View style={styles.primaryButtonContent}>
              <Text style={styles.primaryButtonText}>Get started</Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={colors.textPrimary}
                style={styles.primaryButtonArrow}
              />
            </View>
          </Pressable>

          {/* Secondary CTA: Continue with Google */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
            onPress={handleContinueWithGoogle}
            style={({ pressed }) => [
              styles.googleButton,
              { opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <GoogleIcon size={20} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceWhite,
  },
  heroWrapper: {
    flex: 1,
    width: "100%",
    position: "relative",
    backgroundColor: "#1C1917", // warm dark placeholder while images load
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  headerSafeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 12 : 6,
  },
  logoText: {
    fontFamily: fonts.bold,
    fontSize: 32,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: -0.6,
  },
  skipButton: {
    backgroundColor: "rgba(254, 236, 199, 0.9)", // Soft warm cream pill
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  skipButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  floatingControls: {
    position: "absolute",
    bottom: 46, // Sits above the rounded top corners of the bottom sheet
    left: 24,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 5,
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20, 20, 25, 0.55)", // Translucent dark frosted glass
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    gap: 5,
  },
  locationIcon: {
    marginTop: 0.5,
  },
  locationPillText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.1,
  },
  dotsPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20, 20, 25, 0.55)", // Frosted glass matching location pill
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotInactive: {
    width: 6,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.primary, // Roam primary yellow
  },
  bottomSheet: {
    backgroundColor: colors.surfaceWhite,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -28, // Smoothly clips the hero image with rounded top corners
    paddingTop: 24,
    paddingHorizontal: 28,
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 8,
  },
  lavenderIndicator: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lavender,
    marginBottom: 20,
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 36,
    color: colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 26,
  },
  actionsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary, // #FFC629
    height: 56,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    position: "relative",
  },
  primaryButtonContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  primaryButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  primaryButtonArrow: {
    position: "absolute",
    right: 4,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: radius.full,
    backgroundColor: "transparent",
    gap: 10,
  },
  googleButtonText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    fontWeight: "500",
    color: colors.textPrimary,
  },
});
