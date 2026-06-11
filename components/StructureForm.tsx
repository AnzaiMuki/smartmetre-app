'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { calculate } from '@/lib/calculations';
import type { StructureTypeName } from '@/lib/calculations';

interface StructureType {
  id: number;
  name: StructureTypeName;
}

interface Props {
  projectId: string;
}

export default function StructureForm({ projectId }: Props) {
  const [types, setTypes] = useState<StructureType[]>([]);
  const [selectedType, setSelectedType] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [dimensions, setDimensions] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchTypes = async () => {
      const { data } = await supabase.from('structure_types').select('*');
      if (data) setTypes(data);
    };
    fetchTypes();
  }, []);

  const selectedTypeName = types.find((t) => t.id === selectedType)?.name;

  // Calcul automatique
  const results = useMemo(() => {
    if (!selectedTypeName || Object.keys(dimensions).length === 0) return null;
    return calculate(selectedTypeName, dimensions);
  }, [selectedTypeName, dimensions]);

  const handleDimensionChange = (key: string, value: number) => {
    setDimensions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!selectedType || !selectedTypeName) {
      setError('Veuillez choisir un type d\'ouvrage.');
      return;
    }
    if (!results) {
      setError('Veuillez remplir toutes les dimensions.');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('Vous devez être connecté.');
      return;
    }

    const { error: insertError } = await supabase.from('structures').insert({
      project_id: projectId,
      type_id: selectedType,
      name: name || selectedTypeName,
      parameters: {
        dimensions,
        results,
      },
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      router.push(`/projects/${projectId}`);
      router.refresh();
    }
  };

  // Champs dynamiques selon le type
  const renderFields = () => {
    switch (selectedTypeName) {
      case 'Semelle isolée':
      case 'Semelle filante':
        return (
          <>
            <Input label="Longueur (m)" value={dimensions.longueur} onChange={(v) => handleDimensionChange('longueur', v)} />
            <Input label="Largeur (m)" value={dimensions.largeur} onChange={(v) => handleDimensionChange('largeur', v)} />
            <Input label="Hauteur (m)" value={dimensions.hauteur} onChange={(v) => handleDimensionChange('hauteur', v)} />
          </>
        );
      case 'Poteau':
        return (
          <>
            <Input label="Largeur section (m)" value={dimensions.largeur} onChange={(v) => handleDimensionChange('largeur', v)} />
            <Input label="Hauteur section (m)" value={dimensions.hauteurSection} onChange={(v) => handleDimensionChange('hauteurSection', v)} />
            <Input label="Hauteur (m)" value={dimensions.hauteur} onChange={(v) => handleDimensionChange('hauteur', v)} />
          </>
        );
      case 'Poutre':
        return (
          <>
            <Input label="Largeur (m)" value={dimensions.largeur} onChange={(v) => handleDimensionChange('largeur', v)} />
            <Input label="Hauteur (m)" value={dimensions.hauteur} onChange={(v) => handleDimensionChange('hauteur', v)} />
            <Input label="Longueur (m)" value={dimensions.longueur} onChange={(v) => handleDimensionChange('longueur', v)} />
          </>
        );
      case 'Dalle pleine':
        return (
          <>
            <Input label="Longueur (m)" value={dimensions.longueur} onChange={(v) => handleDimensionChange('longueur', v)} />
            <Input label="Largeur (m)" value={dimensions.largeur} onChange={(v) => handleDimensionChange('largeur', v)} />
            <Input label="Épaisseur (m)" value={dimensions.epaisseur} onChange={(v) => handleDimensionChange('epaisseur', v)} />
          </>
        );
      case 'Mur en agglos':
        return (
          <>
            <Input label="Longueur (m)" value={dimensions.longueur} onChange={(v) => handleDimensionChange('longueur', v)} />
            <Input label="Hauteur (m)" value={dimensions.hauteur} onChange={(v) => handleDimensionChange('hauteur', v)} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={selectedType}
        onChange={(e) => { setSelectedType(Number(e.target.value)); setDimensions({}); }}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">-- Choisir un type --</option>
        {types.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Nom de l'ouvrage (ex: Poteau A1)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {selectedTypeName && (
        <div className="space-y-3 border p-4 rounded bg-gray-50">
          <h3 className="font-semibold">Dimensions</h3>
          {renderFields()}
          {results && (
            <div className="mt-4 p-3 bg-white rounded border">
              <h4 className="font-medium mb-2">Résultats</h4>
              {'volume' in results && (
                <p>Volume béton : <strong>{results.volume.toFixed(2)} m³</strong></p>
              )}
              {'surfaceCoffrage' in results && (
                <p>Surface coffrage : <strong>{results.surfaceCoffrage.toFixed(2)} m²</strong></p>
              )}
              {'acier' in results && (
                <p>Acier estimé : <strong>{results.acier.toFixed(0)} kg</strong></p>
              )}
              {'surfaceMur' in results && (
                <p>Surface du mur : <strong>{results.surfaceMur.toFixed(2)} m²</strong></p>
              )}
              {'nbParpaings' in results && (
                <p>Nombre de parpaings : <strong>{results.nbParpaings}</strong></p>
              )}
              {'volumeMortier' in results && (
                <p>Mortier estimé : <strong>{results.volumeMortier.toFixed(2)} m³</strong></p>
              )}
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Ajouter l'ouvrage
      </button>
    </form>
  );
}

// Petit sous-composant pour les champs
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        step="any"
        value={value ?? ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}