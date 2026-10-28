import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";
import { colors, spacing, radius, fonts } from "@/theme";
import {
  ThemedText,
  Button,
  IconButton,
  InputField,
  SearchInput,
  FilterChip,
  CategoryChip,
  SegmentedControl,
  Badge,
  AlertBanner,
  Toggle,
  Stepper,
  PolicyCard,
  ProfileRow,
  ListingCard,
  LiquidGlassTabBar,
} from "@/components";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function ClerkSignOutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      router.replace("/");
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Sign out"
      onPress={handleSignOut}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: colors.errorBackground,
          borderColor: colors.errorBorder,
          borderWidth: 1,
          borderRadius: radius.full,
          paddingVertical: 6,
          paddingHorizontal: 12,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      <Ionicons name="log-out-outline" size={16} color={colors.error} />
      <ThemedText variant="caption" style={{ color: colors.error, fontWeight: "600" }}>
        Sign out
      </ThemedText>
    </Pressable>
  );
}

export default function DesignSystemScreen() {
  const router = useRouter();
  // Interactive state for the showcase components
  const [selectedFilter, setSelectedFilter] = useState("Cabins");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSegment, setSelectedSegment] = useState("list");
  const [activeTab, setActiveTab] = useState("home");
  const [toggleValue, setToggleValue] = useState(true);
  const [stepperValue, setStepperValue] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [formName, setFormName] = useState("Joanna Smith");
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surfaceGray }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          padding: spacing.md,
          gap: spacing.xl,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header / Intro */}
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Pressable
              onPress={() => router.replace("/")}
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="arrow-back" size={18} color={colors.textPrimary} />
              <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
                Onboarding
              </ThemedText>
            </Pressable>

            {publishableKey ? (
              <ClerkSignOutButton />
            ) : (
              <Pressable
                onPress={() => router.replace("/")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: colors.surfaceWhite,
                  borderColor: colors.borderGray,
                  borderWidth: 1,
                  borderRadius: radius.full,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Ionicons name="log-out-outline" size={14} color={colors.textSecondary} />
                <ThemedText variant="caption" style={{ color: colors.textSecondary }}>
                  Sign out
                </ThemedText>
              </Pressable>
            )}
          </View>

          <ThemedText
            variant="caption"
            style={{ textTransform: "uppercase", letterSpacing: 1.5, color: colors.textSecondary }}
          >
            Roam Mobile Design System
          </ThemedText>
          <ThemedText variant="heading" style={{ fontSize: 32 }}>
            Component & Token Spec
          </ThemedText>
        </View>

        {/* 01. Brand */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            01. Brand
          </ThemedText>
          <View
            style={{
              backgroundColor: colors.surfaceWhite,
              padding: spacing.lg,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              gap: spacing.xs,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: 48,
                letterSpacing: -1.5,
                color: colors.textPrimary,
              }}
            >
              roam
            </Text>
            <ThemedText variant="bodyMedium" style={{ color: colors.textSecondary }}>
              Find unforgettable stays for every kind of trip.
            </ThemedText>
          </View>
        </View>

        {/* 02. Color palette */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            02. Color palette
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: spacing.sm,
            }}
          >
            {[
              { name: "Primary Yellow", hex: colors.primary, role: "Primary actions, active states", dark: true },
              { name: "Lavender", hex: colors.lavender, role: "Secondary actions, highlights", dark: true },
              { name: "Text Primary", hex: colors.textPrimary, role: "Headings, primary text", dark: false },
              { name: "Text Secondary", hex: colors.textSecondary, role: "Body text, secondary text", dark: false },
              { name: "Surface White", hex: colors.surfaceWhite, role: "Cards, sheets, modals", dark: true, border: true },
              { name: "Surface Gray", hex: colors.surfaceGray, role: "App background, input fields", dark: true },
              { name: "Border Gray", hex: colors.borderGray, role: "Dividers, borders", dark: true },
              { name: "Glass Blur", hex: "rgba(255, 255, 255, 0.7)", role: "Tab bar, glass surfaces", dark: true, border: true },
            ].map((c) => (
              <View
                key={c.name}
                style={{
                  width: "48%",
                  backgroundColor: colors.surfaceWhite,
                  borderRadius: radius.md,
                  borderCurve: "continuous",
                  padding: spacing.sm,
                  gap: spacing.xs,
                  borderWidth: 1,
                  borderColor: colors.borderGray,
                }}
              >
                <View
                  style={{
                    height: 54,
                    backgroundColor: c.hex,
                    borderRadius: radius.sm,
                    borderWidth: c.border ? 1 : 0,
                    borderColor: colors.borderGray,
                  }}
                />
                <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textPrimary }}>
                  {c.name}
                </ThemedText>
                <ThemedText variant="small" style={{ color: colors.textSecondary }}>
                  {c.hex}
                </ThemedText>
                <ThemedText variant="small" style={{ fontSize: 11, color: colors.textSecondary }}>
                  {c.role}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* 03. Typography */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            03. Typography
          </ThemedText>
          <View
            style={{
              backgroundColor: colors.surfaceWhite,
              padding: spacing.lg,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              gap: spacing.md,
            }}
          >
            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ fontWeight: "600", color: colors.textSecondary }}>
                Display · Geometric Sans (Bold) · 56px · Line height 1.0
              </ThemedText>
              <ThemedText variant="display" style={{ fontSize: 44, lineHeight: 46 }}>
                Find your next stay
              </ThemedText>
            </View>

            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ fontWeight: "600", color: colors.textSecondary }}>
                Heading · Geometric Sans (Bold) · 28px · Line height 1.2
              </ThemedText>
              <ThemedText variant="heading">
                Modern Cabin with Hot Tub
              </ThemedText>
            </View>

            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ fontWeight: "600", color: colors.textSecondary }}>
                Body · Geometric Sans (Regular) · 16px · Line height 1.5
              </ThemedText>
              <ThemedText variant="body">
                From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip.
              </ThemedText>
            </View>

            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ fontWeight: "600", color: colors.textSecondary }}>
                Caption · Geometric Sans (Medium) · 14px · Line height 1.4
              </ThemedText>
              <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
                Lake Arrowhead, CA
              </ThemedText>
            </View>

            <View style={{ gap: 4, width: 180 }}>
              <ThemedText variant="small" style={{ fontWeight: "600", color: colors.textSecondary }}>
                Button · Geometric Sans (Medium) · 17px
              </ThemedText>
              <Button title="Book this stay" size="sm" />
            </View>
          </View>
        </View>

        {/* 04. Buttons */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            04. Buttons
          </ThemedText>
          <View
            style={{
              backgroundColor: colors.surfaceWhite,
              padding: spacing.lg,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              gap: spacing.md,
            }}
          >
            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ color: colors.textSecondary }}>
                Primary
              </ThemedText>
              <Button
                title="Book this stay"
                variant="primary"
                rightIcon={<Ionicons name="arrow-forward" size={18} color={colors.textPrimary} />}
              />
            </View>

            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ color: colors.textSecondary }}>
                Secondary
              </ThemedText>
              <Button
                title="Continue with Google"
                variant="secondary"
                leftIcon={<Ionicons name="logo-google" size={18} color={colors.textPrimary} />}
              />
            </View>

            <View style={{ gap: 8 }}>
              <ThemedText variant="small" style={{ color: colors.textSecondary }}>
                Icon buttons
              </ThemedText>
              <View style={{ flexDirection: "row", gap: spacing.md }}>
                <IconButton
                  icon={<Ionicons name="heart-outline" size={20} color={colors.textPrimary} />}
                  accessibilityLabel="Heart"
                />
                <IconButton
                  icon={<Ionicons name="share-outline" size={20} color={colors.textPrimary} />}
                  accessibilityLabel="Share"
                />
                <IconButton
                  icon={<Ionicons name="search-outline" size={20} color={colors.textPrimary} />}
                  accessibilityLabel="Search"
                />
                <IconButton
                  icon={<Ionicons name="bookmark-outline" size={20} color={colors.textPrimary} />}
                  accessibilityLabel="Bookmark"
                />
              </View>
            </View>
          </View>
        </View>

        {/* 05. Input Fields */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            05. Input Fields
          </ThemedText>
          <View
            style={{
              backgroundColor: colors.surfaceWhite,
              padding: spacing.lg,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              gap: spacing.md,
            }}
          >
            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ color: colors.textSecondary }}>
                Search Field
              </ThemedText>
              <SearchInput onFilterPress={() => {}} />
            </View>

            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ color: colors.textSecondary }}>
                Form field (default)
              </ThemedText>
              <InputField
                placeholder="Enter your name"
                leftIcon={<Ionicons name="person-outline" size={20} color={colors.textSecondary} />}
              />
            </View>

            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ color: colors.textSecondary }}>
                Form field (focused / value)
              </ThemedText>
              <InputField
                value={formName}
                onChangeText={setFormName}
                leftIcon={<Ionicons name="person-outline" size={20} color={colors.textPrimary} />}
              />
            </View>

            <View style={{ gap: 4 }}>
              <ThemedText variant="small" style={{ color: colors.textSecondary }}>
                Password field
              </ThemedText>
              <InputField
                placeholder="Password"
                defaultValue="supersecretpass"
                isPassword
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />}
              />
            </View>
          </View>
        </View>

        {/* 06. Filter chips */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            06. Filter chips
          </ThemedText>
          <View
            style={{
              backgroundColor: colors.surfaceWhite,
              padding: spacing.lg,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              gap: spacing.md,
            }}
          >
            {/* Row 1: State Filter Chips */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {["Cabins", "Under $300", "Pet Friendly", "Quiet"].map((chip) => (
                <FilterChip
                  key={chip}
                  label={chip}
                  selected={selectedFilter === chip}
                  onPress={() => setSelectedFilter(chip)}
                />
              ))}
            </View>

            {/* Row 2: Category Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: spacing.sm }}>
                <CategoryChip
                  label="All Stays"
                  icon={<Ionicons name="home" size={16} color={selectedCategory === "all" ? colors.textPrimary : colors.textSecondary} />}
                  selected={selectedCategory === "all"}
                  onPress={() => setSelectedCategory("all")}
                />
                <CategoryChip
                  label="Cabins"
                  icon={<Ionicons name="triangle-outline" size={16} color={selectedCategory === "cabins" ? colors.textPrimary : colors.textSecondary} />}
                  selected={selectedCategory === "cabins"}
                  onPress={() => setSelectedCategory("cabins")}
                />
                <CategoryChip
                  label="Beach"
                  icon={<Ionicons name="sunny-outline" size={16} color={selectedCategory === "beach" ? colors.textPrimary : colors.textSecondary} />}
                  selected={selectedCategory === "beach"}
                  onPress={() => setSelectedCategory("beach")}
                />
                <CategoryChip
                  label="City"
                  icon={<Ionicons name="business-outline" size={16} color={selectedCategory === "city" ? colors.textPrimary : colors.textSecondary} />}
                  selected={selectedCategory === "city"}
                  onPress={() => setSelectedCategory("city")}
                />
                <CategoryChip
                  label="Villas"
                  icon={<Ionicons name="leaf-outline" size={16} color={selectedCategory === "villas" ? colors.textPrimary : colors.textSecondary} />}
                  selected={selectedCategory === "villas"}
                  onPress={() => setSelectedCategory("villas")}
                />
              </View>
            </ScrollView>
          </View>
        </View>

        {/* 07. Listing card */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            07. Listing card
          </ThemedText>
          <View
            style={{
              backgroundColor: colors.surfaceWhite,
              padding: spacing.md,
              borderRadius: radius.lg,
              borderCurve: "continuous",
            }}
          >
            <ListingCard
              imageUrl="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80"
              title="Modern Cabin with Hot Tub"
              location="Lake Arrowhead, CA"
              rating={4.9}
              reviewCount={342}
              pricePerNight={280}
              amenities={["Hot Tub", "Pet Friendly"]}
              isFavorite={isFavorited}
              onFavoritePress={() => setIsFavorited(!isFavorited)}
            />
          </View>
        </View>

        {/* 08. Policy card */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            08. Policy card
          </ThemedText>
          <View style={{ gap: spacing.sm }}>
            <PolicyCard
              icon="chatbubble-ellipses-outline"
              title="Ask about policies"
              description="Cancellation, house rules, pets, check-in and more"
            />
            <PolicyCard
              icon="document-text-outline"
              title="Free cancellation"
              description="Full refund up to 7 days before check-in"
            />
          </View>
        </View>

        {/* 09. Profile row */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            09. Profile row
          </ThemedText>
          <View
            style={{
              backgroundColor: colors.surfaceWhite,
              paddingVertical: spacing.xs,
              paddingHorizontal: spacing.sm,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              borderWidth: 1,
              borderColor: colors.borderGray,
            }}
          >
            <ProfileRow icon="person-outline" title="Personal info" />
            <View style={{ height: 1, backgroundColor: colors.borderGray, marginHorizontal: spacing.sm }} />
            <ProfileRow icon="card-outline" title="Payment methods" />
            <View style={{ height: 1, backgroundColor: colors.borderGray, marginHorizontal: spacing.sm }} />
            <ProfileRow icon="briefcase-outline" title="Trips" />
          </View>
        </View>

        {/* 10. Bottom navigation */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            10. Bottom navigation
          </ThemedText>
          <LiquidGlassTabBar
            activeTabId={activeTab}
            onTabPress={(id) => setActiveTab(id)}
          />
        </View>

        {/* 11. Iconography */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            11. Iconography
          </ThemedText>
          <View
            style={{
              backgroundColor: colors.surfaceWhite,
              padding: spacing.lg,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              borderWidth: 1,
              borderColor: colors.borderGray,
              gap: spacing.lg,
            }}
          >
            {/* Row 1: 5 icons */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {[
                "home-outline",
                "search-outline",
                "heart-outline",
                "calendar-outline",
                "person-outline",
              ].map((iconName) => (
                <View
                  key={iconName}
                  style={{
                    width: 44,
                    height: 44,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name={iconName as any}
                    size={24}
                    color={colors.textPrimary}
                  />
                </View>
              ))}
            </View>

            {/* Row 2: 3 icons (matching the first 3 columns of row 1) */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {[
                "settings-outline",
                "location-outline",
                "options-outline",
              ].map((iconName) => (
                <View
                  key={iconName}
                  style={{
                    width: 44,
                    height: 44,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name={iconName as any}
                    size={24}
                    color={colors.textPrimary}
                  />
                </View>
              ))}
              {/* Spacers to align directly with 5-column layout */}
              <View style={{ width: 44, height: 44 }} />
              <View style={{ width: 44, height: 44 }} />
            </View>
          </View>
        </View>

        {/* 12. Segmented control */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            12. Segmented control
          </ThemedText>
          <SegmentedControl
            items={[
              { id: "list", label: "List", icon: <Ionicons name="list" size={16} color={selectedSegment === "list" ? colors.onDark : colors.textSecondary} /> },
              { id: "map", label: "Map", icon: <Ionicons name="map-outline" size={16} color={selectedSegment === "map" ? colors.onDark : colors.textSecondary} /> },
            ]}
            selectedId={selectedSegment}
            onSelect={(id) => setSelectedSegment(id)}
          />
        </View>

        {/* 13. Toggles / Steppers */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            13. Toggles / Steppers
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.surfaceWhite,
              padding: spacing.md,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              borderWidth: 1,
              borderColor: colors.borderGray,
            }}
          >
            <Toggle value={toggleValue} onValueChange={setToggleValue} />
            <Stepper value={stepperValue} onChange={setStepperValue} />
          </View>
        </View>

        {/* 14. Status / Alerts */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            14. Status / Alerts
          </ThemedText>
          <View style={{ gap: spacing.sm }}>
            {showSuccessAlert && (
              <AlertBanner
                type="success"
                message="Account created successfully"
                onDismiss={() => setShowSuccessAlert(false)}
              />
            )}
            {showErrorAlert && (
              <AlertBanner
                type="error"
                message="Something went wrong. Please try again."
                onDismiss={() => setShowErrorAlert(false)}
              />
            )}
          </View>
        </View>

        {/* 15. Tags / Badges */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ fontWeight: "700", color: colors.textSecondary }}>
            15. Tags / Badges
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: spacing.md,
              backgroundColor: colors.surfaceWhite,
              padding: spacing.md,
              borderRadius: radius.lg,
              borderCurve: "continuous",
              borderWidth: 1,
              borderColor: colors.borderGray,
            }}
          >
            <Badge
              variant="favorite"
              label="Guest favorite"
              icon={<Ionicons name="star-outline" size={14} color={colors.textPrimary} />}
            />
            <Badge variant="new" label="New" />
            <Badge variant="discount" label="20% off" />
            <Badge variant="superhost" label="Superhost" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
