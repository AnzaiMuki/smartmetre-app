'use client';

import { generateProjectPDF } from '@/lib/exports/pdf';
import { generateProjectExcel } from '@/lib/exports/excel';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

interface ExportButtonsProps {
  projectId: string;
}

export default function ExportButtons({ projectId }: ExportButtonsProps) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const fetchData = async () => {
    // Récupérer le projet
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    // Récupérer les ouvrages avec leur type
    const { data: structures } = await supabase
      .from('structures')
      .select('*, structure_types(name)')
      .eq('project_id', projectId);

    return { project, structures };
  };

  const handlePDF = async () => {
    setLoading(true);
    const { project, structures } = await fetchData();
    if (!project || !structures) {
      alert('Aucune donnée à exporter.');
      setLoading(false);
      return;
    }

    const mappedStructures = structures.map((s: any) => ({
      name: s.name,
      typeName: s.structure_types?.name || 'Inconnu',
      dimensions: s.parameters?.dimensions || {},
      results: s.parameters?.results || {},
    }));

    const doc = generateProjectPDF(project, mappedStructures);
    doc.save(`Métré_${project.name.replace(/\s+/g, '_')}.pdf`);
    setLoading(false);
  };

  const handleExcel = async () => {
    setLoading(true);
    const { project, structures } = await fetchData();
    if (!project || !structures) {
      alert('Aucune donnée à exporter.');
      setLoading(false);
      return;
    }

    const mappedStructures = structures.map((s: any) => ({
      name: s.name,
      typeName: s.structure_types?.name || 'Inconnu',
      dimensions: s.parameters?.dimensions || {},
      results: s.parameters?.results || {},
    }));

    await generateProjectExcel(project, mappedStructures);
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handlePDF}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Export...' : 'Exporter PDF'}
      </button>
      <button
        onClick={handleExcel}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Export...' : 'Exporter Excel'}
      </button>
    </div>
  );
}