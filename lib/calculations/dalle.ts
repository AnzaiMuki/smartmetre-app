export interface DalleDimensions {
  longueur: number;
  largeur: number;
  epaisseur: number;
}

export function calculerDalle(dim: DalleDimensions) {
  const volume = dim.longueur * dim.largeur * dim.epaisseur;
  const surfaceCoffrage =
    dim.longueur * dim.largeur + 2 * (dim.longueur + dim.largeur) * dim.epaisseur;
  const acier = volume * 100; // 100 kg/m³
  return { volume, surfaceCoffrage, acier };
}