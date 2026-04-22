export type ViewId = "home" | "work" | "projects" | "contact";

export interface ViewMeta {
  id: ViewId;
  label: string;
  accent: string;
}

export const VIEWS: ViewMeta[] = [
  { id: "home", label: "Home", accent: "#3730a3" },
  { id: "work", label: "Work", accent: "#6b21a8" },
  { id: "projects", label: "Projects", accent: "#0e7490" },
  { id: "contact", label: "Contact", accent: "#b45309" },
];

export function getViewMeta(id: ViewId): ViewMeta {
  return VIEWS.find((v) => v.id === id) ?? VIEWS[0];
}
