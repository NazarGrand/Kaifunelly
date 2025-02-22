import { createTheme } from "@mantine/core";
import { typography } from "./typography";
import { colorsTheme } from "./colors";

export const theme = createTheme({
  colors: colorsTheme,

  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.25rem", // 20px
    xxl: "1.5rem", // 24px
    "3xl": "2rem", // 32px
    "4xl": "2.5rem", // 40px
    "5xl": "3rem", // 48px
    "6xl": "3.5rem", // 56px
    "7xl": "4rem", // 64px
    "8xl": "4.5rem", // 72px
    "9xl": "5rem", // 80px
    "10xl": "5.5rem", // 88px
  },

  radius: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
  },

  shadows: {
    shadow1: "-2px 2px 15px -1px rgba(113, 113, 113, 0.12)",
    shadow2: "-2px 2px 20px -1px rgba(113, 113, 113, 0.2)",
    shadow3: "-2px 2px 10px -1px rgba.113, 113, 113, 0.15)",
  },

  fontFamily: "Inter",

  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "2rem", // 32px
    "4xl": "2.5rem", // 40px
    "5xl": "2.75rem", // 44px
    "6xl": "3.5rem", // 56px
    "7xl": "4rem", // 64px
  },

  other: typography,
});
