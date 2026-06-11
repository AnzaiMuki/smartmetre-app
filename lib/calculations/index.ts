import { calculerSemelle, SemelleDimensions } from './semelle';
import { calculerPoteau, PoteauDimensions } from './poteau';
import { calculerPoutre, PoutreDimensions } from './poutre';
import { calculerDalle, DalleDimensions } from './dalle';
import { calculerMurAgglos, MurAgglosDimensions } from './murAgglos';

export type StructureTypeName =
  | 'Semelle isolée'
  | 'Semelle filante'
  | 'Poteau'
  | 'Poutre'
  | 'Dalle pleine'
  | 'Mur en agglos';

export function calculate(type: StructureTypeName, dimensions: Record<string, number>) {
  switch (type) {
    case 'Semelle isolée':
    case 'Semelle filante':
      return calculerSemelle(dimensions as SemelleDimensions);
    case 'Poteau':
      return calculerPoteau(dimensions as PoteauDimensions);
    case 'Poutre':
      return calculerPoutre(dimensions as PoutreDimensions);
    case 'Dalle pleine':
      return calculerDalle(dimensions as DalleDimensions);
    case 'Mur en agglos':
      return calculerMurAgglos(dimensions as MurAgglosDimensions);
    default:
      return null;
  }
}