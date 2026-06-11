export interface SemelleDimensions {
  longueur: number; // m
  largeur: number;
  hauteur: number;
}

export function calculerSemelle(dim: SemelleDimensions) {
  const volume = dim.longueur * dim.largeur * dim.hauteur;
  const surfaceCoffrage = 2 * dim.hauteur * (dim.longueur + dim.largeur);
  const acier = volume * 80; // 80 kg/m³
  return { volume, surfaceCoffrage, acier };
}