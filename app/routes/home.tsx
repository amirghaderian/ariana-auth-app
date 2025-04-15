import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ariana Labs auth" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

