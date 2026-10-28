import React from "react";
import { Image } from "expo-image";
import { StyleProp, ImageStyle } from "react-native";

export interface GoogleIconProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const GOOGLE_LOGO_ASSET = require("../../assets/images/google-logo.png");

export function GoogleIcon({ size = 20, style }: GoogleIconProps) {
  return (
    <Image
      source={GOOGLE_LOGO_ASSET}
      style={[{ width: size, height: size }, style]}
      contentFit="contain"
      accessibilityLabel="Google logo"
    />
  );
}

