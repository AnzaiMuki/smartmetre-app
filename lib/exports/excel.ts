import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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

export async function generateProjectExcel(
  project: ExportProject,
  structures: ExportStructure[]
) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'SmartMétré';

  const sheet = workbook.addWorksheet('Métré');

  // En-tête
  sheet.mergeCells('A1:D1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = `Projet : ${project.name}`;
  titleCell.font = { bold: true, size: 14 };
  sheet.getCell('A2').value = `Localisation : ${project.location || ''}`;
  sheet.getCell('A3').value = `Client : ${project.client || ''}`;
  sheet.getCell('A4').value = `Date : ${new Date(project.date).toLocaleDateString('fr-FR')}`;

  sheet.addRow([]);
  const headerRow = sheet.addRow([
    'Ouvrage', 'Type', 'Dimensions',
    'Volume (m³)', 'Coffrage (m²)', 'Acier (kg)',
    'Parpaings', 'Mortier (m³)',
  ]);
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2980B9' },
  };
  headerRow.font = { color: { argb: 'FFFFFFFF' }, bold: true };

  for (const s of structures) {
    sheet.addRow([
      s.name || 'Sans nom',
      s.typeName,
      Object.entries(s.dimensions)
        .map(([k, v]) => `${k}: ${v} m`)
        .join(', '),
      s.results.volume || '',
      s.results.surfaceCoffrage || '',
      s.results.acier || '',
      s.results.nbParpaings || '',
      s.results.volumeMortier || '',
    ]);
  }

  // Cumul
  sheet.addRow([]);
  const cumulRow = sheet.addRow([
    'TOTAL', '', '',
    structures.reduce((acc, s) => acc + (s.results.volume || 0), 0),
    structures.reduce((acc, s) => acc + (s.results.surfaceCoffrage || 0), 0),
    structures.reduce((acc, s) => acc + (s.results.acier || 0), 0),
    structures.reduce((acc, s) => acc + (s.results.nbParpaings || 0), 0),
    structures.reduce((acc, s) => acc + (s.results.volumeMortier || 0), 0),
  ]);
  cumulRow.font = { bold: true };

  // Largeurs des colonnes
  sheet.columns.forEach((col) => {
    col.width = 22;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `Métré_${project.name.replace(/\s+/g, '_')}.xlsx`);
}