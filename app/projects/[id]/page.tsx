import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, ArrowLeft, Ruler, FileText, HardHat, BrickWall, Droplets } from "lucide-react";
import ExportButtons from "@/components/ExportButtons";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();
  if (!project) return <p className="p-8">Projet introuvable.</p>;

  const { data: structures } = await supabase
    .from("structures")
    .select("*, structure_types(name)")
    .eq("project_id", id);

  const cumul: any = { volume: 0, surfaceCoffrage: 0, acier: 0, nbParpaings: 0, volumeMortier: 0 };
  structures?.forEach((s: any) => {
    const r = s.parameters?.results || {};
    if (r.volume) cumul.volume += r.volume;
    if (r.surfaceCoffrage) cumul.surfaceCoffrage += r.surfaceCoffrage;
    if (r.acier) cumul.acier += r.acier;
    if (r.nbParpaings) cumul.nbParpaings += r.nbParpaings;
    if (r.volumeMortier) cumul.volumeMortier += r.volumeMortier;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{project.name}</h1>
          <p className="text-muted-foreground">
            {project.location} · {new Date(project.date).toLocaleDateString("fr-FR")}
            {project.client && ` · Client : ${project.client}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Béton</CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-primary">{cumul.volume.toFixed(2)} m³</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Coffrage</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-foreground">{cumul.surfaceCoffrage.toFixed(2)} m²</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Acier</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-primary">{cumul.acier.toFixed(0)} kg</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Parpaings</CardTitle>
            <BrickWall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-foreground">{cumul.nbParpaings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mortier</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-foreground">{cumul.volumeMortier.toFixed(2)} m³</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Button asChild>
          <Link href={`/projects/${id}/new`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un ouvrage
          </Link>
        </Button>
        <ExportButtons projectId={id} />
      </div>

      {structures && structures.length > 0 ? (
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground font-semibold">Nom</TableHead>
                <TableHead className="text-foreground font-semibold">Type</TableHead>
                <TableHead className="text-foreground font-semibold">Volume</TableHead>
                <TableHead className="text-foreground font-semibold">Coffrage</TableHead>
                <TableHead className="text-foreground font-semibold">Acier</TableHead>
                <TableHead className="text-foreground font-semibold">Parpaings</TableHead>
                <TableHead className="text-foreground font-semibold">Mortier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {structures.map((s: any) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium text-foreground">{s.name || "Sans nom"}</TableCell>
                  <TableCell className="text-foreground">{s.structure_types?.name || "Inconnu"}</TableCell>
                  <TableCell className="font-medium text-foreground">{s.parameters?.results?.volume?.toFixed(2) || "-"} m³</TableCell>
                  <TableCell className="font-medium text-foreground">{s.parameters?.results?.surfaceCoffrage?.toFixed(2) || "-"} m²</TableCell>
                  <TableCell className="font-medium text-primary">{s.parameters?.results?.acier?.toFixed(0) || "-"} kg</TableCell>
                  <TableCell className="font-medium text-foreground">{s.parameters?.results?.nbParpaings || "-"}</TableCell>
                  <TableCell className="font-medium text-foreground">{s.parameters?.results?.volumeMortier?.toFixed(2) || "-"} m³</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md bg-card">
          <HardHat className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">Aucun ouvrage</h3>
          <p className="text-muted-foreground mt-1">
            Ajoutez votre premier ouvrage pour voir le métré.
          </p>
        </div>
      )}
    </div>
  );
}