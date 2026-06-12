"use client";

import { generateProjectPDF } from "@/lib/exports/pdf";
import { generateProjectExcel } from "@/lib/exports/excel";
import { createClient } from "@/lib/supabase/client";

interface ExportButtonsProps {
  projectId: string;
}

export default function ExportButtons({ projectId }: ExportButtonsProps) {
  const supabase = createClient();

  const fetchData = async () => {
    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    const { data: structures } = await supabase
      .from("structures")
      .select("*, structure_types(name)")
      .eq("project_id", projectId);

    return { project, structures };
  };

  const handlePDF = async () => {
    const { project, structures } = await fetchData();
    if (!project || !structures) {
      alert("Aucune donnée à exporter.");
      return;
    }

    const mappedStructures = structures.map((s: any) => ({
      name: s.name,
      typeName: s.structure_types?.name || "Inconnu",
      dimensions: s.parameters?.dimensions || {},
      results: s.parameters?.results || {},
    }));

    const doc = generateProjectPDF(project, mappedStructures);
    doc.save(`Métré_${project.name.replace(/\s+/g, "_")}.pdf`);
  };

  const handleExcel = async () => {
    const { project, structures } = await fetchData();
    if (!project || !structures) {
      alert("Aucune donnée à exporter.");
      return;
    }

    const mappedStructures = structures.map((s: any) => ({
      name: s.name,
      typeName: s.structure_types?.name || "Inconnu",
      dimensions: s.parameters?.dimensions || {},
      results: s.parameters?.results || {},
    }));

    await generateProjectExcel(project, mappedStructures);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handlePDF}
        id="btn-export-pdf"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Exporter PDF
      </button>
      <button
        onClick={handleExcel}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Exporter Excel
      </button>
    </div>
  );
}