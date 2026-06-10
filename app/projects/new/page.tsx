'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function NewProject() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [client, setClient] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('Vous devez être connecté.');
      return;
    }

    const { error: insertError } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name,
        location,
        client,
        date,
      });

    if (insertError) {
      setError(insertError.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nouveau projet</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom du projet *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Localisation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Maître d'ouvrage (client)"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Créer le projet
        </button>
      </form>
    </div>
  );
}