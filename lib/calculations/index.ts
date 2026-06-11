import { calculerSemelle } from './semelle';
import type { SemelleDimensions } from './semelle';
import { calculerPoteau } from './poteau';
import type { PoteauDimensions } from './poteau';
import { calculerPoutre } from './poutre';
import type { PoutreDimensions } from './poutre';
import { calculerDalle } from './dalle';
import type { DalleDimensions } from './dalle';
import { calculerMurAgglos } from './murAgglos';
import type { MurAgglosDimensions } from './murAgglos';

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
      return calculerSemelle(dimensions as unknown as SemelleDimensions);
    case 'Poteau':
      return calculerPoteau(dimensions as unknown as PoteauDimensions);
    case 'Poutre':
      return calculerPoutre(dimensions as unknown as PoutreDimensions);
    case 'Dalle pleine':
      return calculerDalle(dimensions as unknown as DalleDimensions);
    case 'Mur en agglos':
      return calculerMurAgglos(dimensions as unknown as MurAgglosDimensions);
    default:
      return null;
  }
}