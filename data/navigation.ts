export type NavigationItem = {
  label: string;
  href: string;
  comingSoon?: boolean;
};

export const navigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" }
] as const;
