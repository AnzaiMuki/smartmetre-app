export interface PoteauDimensions {
  largeur: number; // m
  hauteurSection: number; // m
  hauteur: number; // m
}

export function calculerPoteau(dim: PoteauDimensions) {
  const volume = dim.largeur * dim.hauteurSection * dim.hauteur;
  const surfaceCoffrage = 2 * (dim.largeur + dim.hauteurSection) * dim.hauteur;
  const acier = volume * 120; // 120 kg/m³
  return { volume, surfaceCoffrage, acier };
}