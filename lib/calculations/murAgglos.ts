export interface MurAgglosDimensions {
  longueur: number; // m
  hauteur: number; // m
}

export function calculerMurAgglos(dim: MurAgglosDimensions) {
  const surfaceMur = dim.longueur * dim.hauteur;
  // Parpaing standard 40x20x20 (longueur 0.4 m, hauteur 0.2 m)
  const surfaceParpaing = 0.4 * 0.2;
  const nbParpaings = Math.ceil(surfaceMur / surfaceParpaing);
  // Volume de mortier estimé (0.02 m³/m²)
  const volumeMortier = surfaceMur * 0.02;
  return { surfaceMur, nbParpaings, volumeMortier };
}