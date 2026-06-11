import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportProject {
  name: string;
  location?: string;
  client?: string;
  date: string;
}

interface ExportStructure {
  name: string;
  typeName: string;
  dimensions: Record<string, number>;
  results: Record<string, number>;
}

function formatDimensions(dim: Record<string, number>): string {
  return Object.entries(dim)
    .map(([key, value]) => `${key}: ${value} m`)
    .join(', ');
}

function formatResults(res: Record<string, number>): string {
  const parts: string[] = [];
  if (res.volume !== undefined) parts.push(`Vol: ${res.volume.toFixed(2)} m³`);
  if (res.surfaceCoffrage !== undefined) parts.push(`Coff: ${res.surfaceCoffrage.toFixed(2)} m²`);
  if (res.acier !== undefined) parts.push(`Acier: ${res.acier.toFixed(0)} kg`);
  if (res.surfaceMur !== undefined) parts.push(`Surf: ${res.surfaceMur.toFixed(2)} m²`);
  if (res.nbParpaings !== undefined) parts.push(`Parp: ${res.nbParpaings}`);
  if (res.volumeMortier !== undefined) parts.push(`Mort: ${res.volumeMortier.toFixed(2)} m³`);
  return parts.join(' | ');
}

export function generateProjectPDF(
  project: ExportProject,
  structures: ExportStructure[]
) {
  const doc = new jsPDF();

  // En-tête
  doc.setFontSize(18);
  doc.text('SmartMétré - Rapport de métré', 14, 22);
  doc.setFontSize(11);
  doc.text(`Projet : ${project.name}`, 14, 32);
  if (project.location) doc.text(`Localisation : ${project.location}`, 14, 38);
  if (project.client) doc.text(`Client : ${project.client}`, 14, 44);
  doc.text(`Date : ${new Date(project.date).toLocaleDateString('fr-FR')}`, 14, 50);

  // Tableau des ouvrages
  const tableBody = structures.map((s) => [
    s.name || 'Sans nom',
    s.typeName,
    formatDimensions(s.dimensions),
    formatResults(s.results),
  ]);

  autoTable(doc, {
    startY: 60,
    head: [['Ouvrage', 'Type', 'Dimensions', 'Résultats']],
    body: tableBody,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Cumul
  const cumul: any = { volume: 0, surfaceCoffrage: 0, acier: 0, nbParpaings: 0, volumeMortier: 0 };
  structures.forEach((s) => {
    if (s.results.volume) cumul.volume += s.results.volume;
    if (s.results.surfaceCoffrage) cumul.surfaceCoffrage += s.results.surfaceCoffrage;
    if (s.results.acier) cumul.acier += s.results.acier;
    if (s.results.nbParpaings) cumul.nbParpaings += s.results.nbParpaings;
    if (s.results.volumeMortier) cumul.volumeMortier += s.results.volumeMortier;
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.text('Cumul des quantités', 14, finalY);
  let cumulY = finalY + 6;
  if (cumul.volume > 0) { doc.text(`Volume béton total : ${cumul.volume.toFixed(2)} m³`, 14, cumulY); cumulY += 6; }
  if (cumul.surfaceCoffrage > 0) { doc.text(`Surface coffrage totale : ${cumul.surfaceCoffrage.toFixed(2)} m²`, 14, cumulY); cumulY += 6; }
  if (cumul.acier > 0) { doc.text(`Acier total estimé : ${cumul.acier.toFixed(0)} kg`, 14, cumulY); cumulY += 6; }
  if (cumul.nbParpaings > 0) { doc.text(`Nombre total de parpaings : ${cumul.nbParpaings}`, 14, cumulY); cumulY += 6; }
  if (cumul.volumeMortier > 0) { doc.text(`Volume mortier total : ${cumul.volumeMortier.toFixed(2)} m³`, 14, cumulY); }

  // Pied de page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Généré par SmartMétré - Page ${i}/${pageCount}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
  }

  return doc;
}