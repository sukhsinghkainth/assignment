// theme.js
import "./theme.css";

const rootStyle = getComputedStyle(document.documentElement);
export const themeConfig = {
    token: {
        colorPrimary: rootStyle.getPropertyValue("--color-primary").trim(), // Primary color
        colorText: rootStyle.getPropertyValue("--color-text").trim(), // Default text color
        colorTextDisabled: rootStyle
            .getPropertyValue("--color-text-disabled")
            .trim(), // Disabled text color
        borderRadius: parseInt(
            rootStyle.getPropertyValue("--custom-border-radius").trim(),
            10
        ), // Border radius
        controlHeight: parseInt(
            rootStyle.getPropertyValue("--custom-control-height").trim(),
            10
        ), // Control height (input size)
    },
};