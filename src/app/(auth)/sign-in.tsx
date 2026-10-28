import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/theme";
import {
  ThemedText,
  InputField,
  Button,
  GoogleIcon,
} from "@/components";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In guest/prototype mode, route into the main app
      router.replace("/design-system");
    }, 600);
  };

  const handleGoogleSignIn = () => {
    router.replace("/design-system");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surfaceWhite }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Top Bar with Back Button */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back to onboarding"
            hitSlop={12}
            onPress={handleBack}
            style={({ pressed }) => [
              {
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.surfaceGray,
                borderWidth: 1,
                borderColor: colors.borderGray,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <ThemedText variant="caption" style={{ color: colors.textSecondary, fontWeight: "500" }}>
            Sign In
          </ThemedText>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing.xxl,
            gap: spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={{ gap: spacing.xs }}>
            <ThemedText variant="heading" style={{ color: colors.textPrimary }}>
              Welcome back
            </ThemedText>
            <ThemedText variant="body" style={{ color: colors.textSecondary }}>
              Sign in to manage your bookings, saved stays, and policies.
            </ThemedText>
          </View>

          {/* Form */}
          <View style={{ gap: spacing.md, marginTop: spacing.xs }}>
            <View style={{ gap: 6 }}>
              <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
                Email address
              </ThemedText>
              <InputField
                placeholder="you@domain.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                leftIcon={<Ionicons name="mail-outline" size={20} color={colors.textSecondary} />}
              />
            </View>

            <View style={{ gap: 6 }}>
              <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
                Password
              </ThemedText>
              <InputField
                placeholder="Enter your password"
                isPassword
                value={password}
                onChangeText={setPassword}
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />}
              />
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Pressable hitSlop={8}>
                <ThemedText
                  variant="caption"
                  style={{ color: colors.textPrimary, fontWeight: "600" }}
                >
                  Forgot password?
                </ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Primary Action */}
          <Button
            title="Sign in"
            variant="primary"
            size="lg"
            loading={loading}
            onPress={handleSignIn}
            style={{ marginTop: spacing.xs }}
          />

          {/* Divider */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
              marginVertical: spacing.xs,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: colors.borderGray }} />
            <ThemedText variant="caption" style={{ color: colors.textSecondary }}>
              or continue with
            </ThemedText>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.borderGray }} />
          </View>

          {/* Social Sign In Buttons */}
          <View style={{ gap: spacing.sm }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={handleGoogleSignIn}
              style={({ pressed }) => [
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.sm,
                  backgroundColor: colors.surfaceWhite,
                  borderColor: colors.borderGray,
                  borderWidth: 1,
                  borderRadius: radius.full,
                  paddingVertical: 14,
                  opacity: pressed ? 0.75 : 1,
                },
              ]}
            >
              <GoogleIcon size={20} />
              <ThemedText variant="button" style={{ color: colors.textPrimary, fontWeight: "600" }}>
                Continue with Google
              </ThemedText>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
              onPress={handleGoogleSignIn}
              style={({ pressed }) => [
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.sm,
                  backgroundColor: colors.textPrimary,
                  borderRadius: radius.full,
                  paddingVertical: 14,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Ionicons name="logo-apple" size={20} color={colors.surfaceWhite} />
              <ThemedText variant="button" style={{ color: colors.surfaceWhite, fontWeight: "600" }}>
                Continue with Apple
              </ThemedText>
            </Pressable>
          </View>

          {/* Footer toggle */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: spacing.xs,
              marginTop: spacing.sm,
            }}
          >
            <ThemedText variant="body" style={{ color: colors.textSecondary }}>
              {"Don't have an account?"}
            </ThemedText>
            <Pressable onPress={() => router.replace("/(auth)/sign-up")} hitSlop={8}>
              <ThemedText
                variant="body"
                style={{ color: colors.textPrimary, fontWeight: "700" }}
              >
                Sign up
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}