import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import StructureCard from '@/components/StructureCard';
import ExportButtons from '@/components/ExportButtons';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (!project) {
    return <p className="p-8">Projet introuvable.</p>;
  }

  const { data: structures } = await supabase
    .from('structures')
    .select('*, structure_types(name)')
    .eq('project_id', id);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/dashboard" className="text-blue-600 underline mb-4 block">
        ← Retour au tableau de bord
      </Link>
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-600 mb-6">
        {project.location} · {new Date(project.date).toLocaleDateString('fr-FR')}
        {project.client && ` · Client : ${project.client}`}
      </p>

      <div className="mb-8 flex flex-wrap gap-4 items-center">
  <Link
    href={`/projects/${id}/new`}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    + Ajouter un ouvrage
  </Link>
  <ExportButtons projectId={id} />
</div>

      {structures && structures.length > 0 ? (
        <div className="grid gap-4">
          {structures.map((s: any) => (
            <StructureCard
              key={s.id}
              name={s.name}
              typeName={s.structure_types?.name || 'Inconnu'}
              parameters={s.parameters as any}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun ouvrage dans ce projet.</p>
      )}
    </div>
  );
}