import { Text, TextProps } from "react-native";
import { type, TypographyVariant } from "@/theme";

export interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}

export function ThemedText({
  variant = "body",
  color,
  style,
  ...props
}: ThemedTextProps) {
  return (
    <Text
      style={[
        type[variant],
        color ? { color } : null,
        style,
      ]}
      {...props}
    />
  );
}
