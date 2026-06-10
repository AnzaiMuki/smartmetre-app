'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface StructureType {
  id: number;
  name: string;
}

export default function NewStructure() {
  const params = useParams();
  const projectId = params.id as string;
  const [types, setTypes] = useState<StructureType[]>([]);
  const [selectedType, setSelectedType] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [dimensions, setDimensions] = useState<Record<string, number>>({});
  const [dimensionsText, setDimensionsText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState<string>('Initialisation...');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchTypes = async () => {
      setDebug('Début fetch types');
      setLoading(true);
      try {
        const { data, error } = await supabase.from('structure_types').select('*');
        if (error) {
          setDebug('Erreur fetch : ' + error.message);
          console.error(error);
        } else if (data) {
          setTypes(data);
          setDebug('Types chargés : ' + data.length);
        } else {
          setDebug('Aucun type retourné');
        }
      } catch (err: any) {
        setDebug('Exception : ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedType) {
      setError('Veuillez choisir un type d\'ouvrage.');
      return;
    }

    // Parser le JSON des dimensions
    let parsedDimensions: Record<string, number> = {};
    try {
      parsedDimensions = JSON.parse(dimensionsText || '{}');
    } catch {
      setError('Le format des dimensions est invalide. Utilisez du JSON valide, ex : {"longueur": 2, "largeur": 1.5}');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('Vous devez être connecté.');
      return;
    }

    const typeName = types.find(t => t.id === selectedType)?.name || 'Ouvrage';

    const { error: insertError } = await supabase.from('structures').insert({
      project_id: projectId,
      type_id: selectedType,
      name: name || typeName,
      parameters: parsedDimensions,
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      router.push(`/projects/${projectId}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <Link href={`/projects/${projectId}`} className="text-blue-600 underline mb-4 block">
        ← Retour au projet
      </Link>
      <h1 className="text-2xl font-bold mb-6">Ajouter un ouvrage</h1>

      <p className="text-xs text-gray-400 mb-2">Debug: {debug}</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Chargement des types d'ouvrage...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(Number(e.target.value))}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">-- Choisir un type --</option>
            {types.length === 0 ? (
              <option disabled>Aucun type disponible</option>
            ) : (
              types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))
            )}
          </select>

          <input
            type="text"
            placeholder="Nom de l'ouvrage (ex: Poteau A1)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dimensions (JSON) <span className="text-gray-400">— provisoire</span>
            </label>
            <textarea
              placeholder='{"longueur": 2, "largeur": 1.5, "hauteur": 0.5}'
              value={dimensionsText}
              onChange={(e) => setDimensionsText(e.target.value)}
              className="w-full p-2 border rounded h-24 font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Ajouter l'ouvrage
          </button>
        </form>
      )}
    </div>
  );
}