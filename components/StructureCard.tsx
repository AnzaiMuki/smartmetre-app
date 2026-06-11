interface StructureCardProps {
  name: string;
  typeName: string;
  parameters: {
    dimensions: Record<string, number>;
    results: Record<string, number>;
  };
}

export default function StructureCard({ name, typeName, parameters }: StructureCardProps) {
  const { dimensions, results } = parameters;
  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="font-semibold text-lg">
        {name || 'Sans nom'} <span className="text-gray-500 text-sm">({typeName})</span>
      </h3>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        {Object.entries(dimensions).map(([key, value]) => (
          <div key={key}>
            <span className="text-gray-500">{key} :</span> {value} m
          </div>
        ))}
      </div>
      <div className="mt-3 p-2 bg-gray-50 rounded">
        {results.volume !== undefined && (
          <p>Volume béton : <strong>{results.volume.toFixed(2)} m³</strong></p>
        )}
        {results.surfaceCoffrage !== undefined && (
          <p>Surface coffrage : <strong>{results.surfaceCoffrage.toFixed(2)} m²</strong></p>
        )}
        {results.acier !== undefined && (
          <p>Acier estimé : <strong>{results.acier.toFixed(0)} kg</strong></p>
        )}
        {results.surfaceMur !== undefined && (
          <p>Surface mur : <strong>{results.surfaceMur.toFixed(2)} m²</strong></p>
        )}
        {results.nbParpaings !== undefined && (
          <p>Parpaings : <strong>{results.nbParpaings} unités</strong></p>
        )}
        {results.volumeMortier !== undefined && (
          <p>Mortier : <strong>{results.volumeMortier.toFixed(2)} m³</strong></p>
        )}
      </div>
    </div>
  );
}