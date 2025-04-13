export type ThemeType = "morning" | "afternoon" | "night";

export function getCurrentTheme(): ThemeType {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "night";
}
