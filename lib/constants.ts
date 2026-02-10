// lib/constants.ts
export const THEMES = [
  "Lieu de culte",
  "Lutte contre l'islamophobie",
  "Jeunesse",
  "Économique et social",
  "Urbanisme & Propreté",
  "Autre"
] as const;

export const SECTORS = {
  "Nord": ["Hôpitaux-Facultés", "Euromédecine", "Hauts de Massane"],
  "Sud": ["Prés d'Arènes", "Croix-d'Argent", "Lemasson"],
  "Est": ["Port Marianne", "Millénaire", "Odysseum"],
  "Ouest": ["Mosson", "Celleneuve", "La Paillade", "Malbosc"],
  "Centre": ["Écusson", "Beaux-Arts", "Antigone"],
  "Neutre": ["Ville Globale"]
} as const;

export type SectorKey = keyof typeof SECTORS;