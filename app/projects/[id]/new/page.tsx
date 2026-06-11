import StructureForm from '@/components/StructureForm';

export default async function NewStructurePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un ouvrage</h1>
      <StructureForm projectId={id} />
    </div>
  );
}