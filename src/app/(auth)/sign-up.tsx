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
import { useSignUp } from "@clerk/expo/legacy";
import { colors, spacing, radius } from "@/theme";
import {
  ThemedText,
  InputField,
  Button,
  GoogleIcon,
  AlertBanner,
} from "@/components";

const isClerkConfigured = Boolean(process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);

interface SignUpFormProps {
  onBack: () => void;
  onGoogleSignUp: () => void;
  onGoToSignIn: () => void;
}

/**
 * Live Clerk Sign-Up Form with OTP code verification
 * Rendered only when Clerk Publishable Key is configured
 */
function ClerkSignUpForm({ onBack, onGoogleSignUp, onGoToSignIn }: SignUpFormProps) {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isLoaded || !signUp) {
      setError("Authentication service is initializing. Please try again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0] || name.trim();
      const lastName = nameParts.slice(1).join(" ") || undefined;

      await signUp.create({
        emailAddress: email.trim(),
        password,
        firstName,
        lastName,
      });

      // Prepare email verification to send 6-digit OTP code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Sign up failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!code.trim()) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (!isLoaded || !signUp) return;

    try {
      setLoading(true);
      setError("");
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/design-system");
      } else {
        setError("Verification incomplete. Please check your details and try again.");
      }
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid or expired verification code.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp) return;
    try {
      setError("");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 4000);
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.message || "Could not resend verification code.";
      setError(msg);
    }
  };

  return (
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
      <View style={{ gap: spacing.xs }}>
        <ThemedText variant="heading" style={{ color: colors.textPrimary }}>
          {pendingVerification ? "Verify your email" : "Create your account"}
        </ThemedText>
        <ThemedText variant="body" style={{ color: colors.textSecondary }}>
          {pendingVerification
            ? `Enter the 6-digit verification code sent to ${email}`
            : "Join roam to find and book unique stays tailored to your story."}
        </ThemedText>
      </View>

      {error ? (
        <AlertBanner
          type="error"
          message={error}
          onDismiss={() => setError("")}
        />
      ) : null}

      {resendSuccess ? (
        <AlertBanner
          type="success"
          message="A fresh verification code was sent to your email."
        />
      ) : null}

      {pendingVerification ? (
        <View style={{ gap: spacing.lg, marginTop: spacing.xs }}>
          <View style={{ gap: 6 }}>
            <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
              6-Digit Verification Code
            </ThemedText>
            <InputField
              placeholder="e.g. 123456"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={(val) => {
                setCode(val);
                if (error) setError("");
              }}
              leftIcon={<Ionicons name="key-outline" size={20} color={colors.textSecondary} />}
            />
          </View>

          <Button
            title="Verify and continue"
            variant="primary"
            size="lg"
            loading={loading}
            onPress={handleVerify}
          />

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
            <ThemedText variant="caption" style={{ color: colors.textSecondary }}>
              {"Didn't receive the code?"}
            </ThemedText>
            <Pressable onPress={handleResendCode} hitSlop={8}>
              <ThemedText variant="caption" style={{ color: colors.textPrimary, fontWeight: "700" }}>
                Resend code
              </ThemedText>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <View style={{ gap: spacing.md, marginTop: spacing.xs }}>
            <View style={{ gap: 6 }}>
              <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
                Full name
              </ThemedText>
              <InputField
                placeholder="e.g. Joanna Smith"
                autoCapitalize="words"
                value={name}
                onChangeText={(val) => {
                  setName(val);
                  if (error) setError("");
                }}
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
                onChangeText={(val) => {
                  setEmail(val);
                  if (error) setError("");
                }}
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
                onChangeText={(val) => {
                  setPassword(val);
                  if (error) setError("");
                }}
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />}
              />
            </View>
          </View>

          <Button
            title="Create account"
            variant="primary"
            size="lg"
            loading={loading}
            onPress={handleSignUp}
            style={{ marginTop: spacing.xs }}
          />

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

          <View style={{ gap: spacing.sm }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={onGoogleSignUp}
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
              onPress={onGoogleSignUp}
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
            <Pressable onPress={onGoToSignIn} hitSlop={8}>
              <ThemedText
                variant="body"
                style={{ color: colors.textPrimary, fontWeight: "700" }}
              >
                Sign in
              </ThemedText>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
}

/**
 * Fallback Demo Sign-Up Form (when no Clerk Publishable Key is provided in .env)
 * Does NOT call useSignUp(), completely preventing noClerkProviderError
 */
function DemoSignUpForm({ onBack, onGoogleSignUp, onGoToSignIn }: SignUpFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPendingVerification(true);
    }, 300);
  };

  const handleVerify = async () => {
    if (!code.trim()) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/design-system");
    }, 400);
  };

  const handleResendCode = () => {
    setResendSuccess(true);
    setTimeout(() => setResendSuccess(false), 4000);
  };

  return (
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
      <View style={{ gap: spacing.xs }}>
        <ThemedText variant="heading" style={{ color: colors.textPrimary }}>
          {pendingVerification ? "Verify your email" : "Create your account"}
        </ThemedText>
        <ThemedText variant="body" style={{ color: colors.textSecondary }}>
          {pendingVerification
            ? `Enter the 6-digit verification code sent to ${email || "your email"}`
            : "Join roam to find and book unique stays tailored to your story."}
        </ThemedText>
      </View>

      {!pendingVerification ? (
        <AlertBanner
          type="error"
          message="Demo Mode: Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file to activate live Clerk accounts."
        />
      ) : null}

      {error ? (
        <AlertBanner
          type="error"
          message={error}
          onDismiss={() => setError("")}
        />
      ) : null}

      {resendSuccess ? (
        <AlertBanner
          type="success"
          message="Demo: A mock verification code was sent to your email."
        />
      ) : null}

      {pendingVerification ? (
        <View style={{ gap: spacing.lg, marginTop: spacing.xs }}>
          <View style={{ gap: 6 }}>
            <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
              6-Digit Verification Code (Demo: enter any 6 digits)
            </ThemedText>
            <InputField
              placeholder="e.g. 123456"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={(val) => {
                setCode(val);
                if (error) setError("");
              }}
              leftIcon={<Ionicons name="key-outline" size={20} color={colors.textSecondary} />}
            />
          </View>

          <Button
            title="Verify and continue"
            variant="primary"
            size="lg"
            loading={loading}
            onPress={handleVerify}
          />

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
            <ThemedText variant="caption" style={{ color: colors.textSecondary }}>
              {"Didn't receive the code?"}
            </ThemedText>
            <Pressable onPress={handleResendCode} hitSlop={8}>
              <ThemedText variant="caption" style={{ color: colors.textPrimary, fontWeight: "700" }}>
                Resend code
              </ThemedText>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <View style={{ gap: spacing.md, marginTop: spacing.xs }}>
            <View style={{ gap: 6 }}>
              <ThemedText variant="caption" style={{ fontWeight: "600", color: colors.textPrimary }}>
                Full name
              </ThemedText>
              <InputField
                placeholder="e.g. Joanna Smith"
                autoCapitalize="words"
                value={name}
                onChangeText={(val) => {
                  setName(val);
                  if (error) setError("");
                }}
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
                onChangeText={(val) => {
                  setEmail(val);
                  if (error) setError("");
                }}
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
                onChangeText={(val) => {
                  setPassword(val);
                  if (error) setError("");
                }}
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />}
              />
            </View>
          </View>

          <Button
            title="Create account"
            variant="primary"
            size="lg"
            loading={loading}
            onPress={handleSignUp}
            style={{ marginTop: spacing.xs }}
          />

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

          <View style={{ gap: spacing.sm }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={onGoogleSignUp}
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
              onPress={onGoogleSignUp}
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
            <Pressable onPress={onGoToSignIn} hitSlop={8}>
              <ThemedText
                variant="body"
                style={{ color: colors.textPrimary, fontWeight: "700" }}
              >
                Sign in
              </ThemedText>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
}

export default function SignUpScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleGoogleSignUp = () => {
    router.replace("/(auth)/sign-in");
  };

  const handleGoToSignIn = () => {
    router.replace("/(auth)/sign-in");
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
            accessibilityLabel="Go back"
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
            Sign Up
          </ThemedText>
          <View style={{ width: 44 }} />
        </View>

        {isClerkConfigured ? (
          <ClerkSignUpForm
            onBack={handleBack}
            onGoogleSignUp={handleGoogleSignUp}
            onGoToSignIn={handleGoToSignIn}
          />
        ) : (
          <DemoSignUpForm
            onBack={handleBack}
            onGoogleSignUp={handleGoogleSignUp}
            onGoToSignIn={handleGoToSignIn}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
