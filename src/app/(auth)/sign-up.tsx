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
  IconButton,
  GoogleIcon,
} from "@/components";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In guest/prototype mode, route into the main app
      router.replace("/design-system");
    }, 600);
  };

  const handleGoogleSignUp = () => {
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
          <IconButton
            icon={<Ionicons name="chevron-back" size={22} color={colors.textPrimary} />}
            onPress={() => router.back()}
            accessibilityLabel="Go back"
            variant="outline"
            size="md"
          />
          <ThemedText variant="caption" style={{ color: colors.textSecondary }}>
            Sign Up
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
              Create your account
            </ThemedText>
            <ThemedText variant="body" style={{ color: colors.textSecondary }}>
              Join roam to find and book unique stays tailored to your story.
            </ThemedText>
          </View>

          {/* Form */}
          <View style={{ gap: spacing.md, marginTop: spacing.xs }}>
            <View style={{ gap: 6 }}>
              <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
                Full name
              </ThemedText>
              <InputField
                placeholder="e.g. Joanna Smith"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                leftIcon={<Ionicons name="person-outline" size={20} color={colors.textSecondary} />}
              />
            </View>

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
                placeholder="Create a secure password"
                isPassword
                value={password}
                onChangeText={setPassword}
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />}
              />
            </View>
          </View>

          {/* Primary Action */}
          <Button
            title="Create account"
            variant="primary"
            size="lg"
            loading={loading}
            onPress={handleSignUp}
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
              or sign up with
            </ThemedText>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.borderGray }} />
          </View>

          {/* Social Sign Up Buttons */}
          <View style={{ gap: spacing.sm }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={handleGoogleSignUp}
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
              onPress={handleGoogleSignUp}
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
              Already have an account?
            </ThemedText>
            <Pressable onPress={() => router.replace("/(auth)/sign-in")} hitSlop={8}>
              <ThemedText
                variant="body"
                style={{ color: colors.textPrimary, fontWeight: "700" }}
              >
                Sign in
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
