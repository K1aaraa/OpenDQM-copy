export type NavigationItem = {
  label: string;
  href: string;
  comingSoon?: boolean;
};

export const navigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Updates", href: "/updates", comingSoon: true },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" }
] as const;
