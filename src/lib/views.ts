export type ViewId = "home" | "work" | "projects" | "contact";

export interface ViewMeta {
  id: ViewId;
  label: string;
  accent: string;
}

export const VIEWS: ViewMeta[] = [
  { id: "home", label: "Home", accent: "#6366f1" },
  { id: "work", label: "Work", accent: "#a855f7" },
  { id: "projects", label: "Projects", accent: "#06b6d4" },
  { id: "contact", label: "Contact", accent: "#f59e0b" },
];

export function getViewMeta(id: ViewId): ViewMeta {
  return VIEWS.find((v) => v.id === id) ?? VIEWS[0];
}
