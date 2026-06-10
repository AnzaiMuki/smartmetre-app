import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Récupérer les projets de l'utilisateur
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-600">{user.email}</span>
          <LogoutButton />
        </div>
      </div>

      <div className="mb-8">
        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block"
        >
          + Nouveau projet
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block p-6 border rounded-lg hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p className="text-sm text-gray-600">
                {project.location || 'Aucune localisation'} ·{' '}
                {new Date(project.date).toLocaleDateString('fr-FR')}
              </p>
              {project.client && (
                <p className="text-sm text-gray-500">Client : {project.client}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun projet pour le moment. Créez-en un !</p>
      )}
    </div>
  );
}