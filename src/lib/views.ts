export type ViewId = "home" | "work" | "projects" | "contact";

export interface ViewMeta {
  id: ViewId;
  label: string;
  href: string;
  accent: string;
}

export const VIEWS: ViewMeta[] = [
  { id: "home", label: "Home", href: "/", accent: "#3730a3" },
  { id: "work", label: "Work", href: "/work", accent: "#6b21a8" },
  { id: "projects", label: "Projects", href: "/projects", accent: "#0e7490" },
  { id: "contact", label: "Contact", href: "/contact", accent: "#b45309" },
];

export function getViewMeta(id: ViewId): ViewMeta {
  return VIEWS.find((v) => v.id === id) ?? VIEWS[0];
}

export function viewIdFromPathname(pathname: string): ViewId {
  return VIEWS.find((v) => v.href === pathname)?.id ?? "home";
}
