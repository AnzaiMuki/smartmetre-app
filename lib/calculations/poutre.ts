export interface PoutreDimensions {
  largeur: number; // m
  hauteur: number; // m
  longueur: number; // m
}

export function calculerPoutre(dim: PoutreDimensions) {
  const volume = dim.largeur * dim.hauteur * dim.longueur;
  const surfaceCoffrage = 2 * (dim.largeur + dim.hauteur) * dim.longueur;
  const acier = volume * 150; // 150 kg/m³
  return { volume, surfaceCoffrage, acier };
}