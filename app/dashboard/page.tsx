import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  FolderOpen,
  HardHat,
} from "lucide-react";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, location, client, date, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  let totalStructures = 0;
  let totalVolume = 0;
  let totalAcier = 0;
  let totalParpaings = 0;
  let totalMortier = 0;

  if (projects && projects.length > 0) {
    const projectIds = projects.map((p) => p.id);
    const { data: allStructures } = await supabase
      .from("structures")
      .select("parameters")
      .in("project_id", projectIds);

    allStructures?.forEach((s) => {
      totalStructures++;
      const r = s.parameters?.results;
      if (r) {
        if (r.volume) totalVolume += r.volume;
        if (r.acier) totalAcier += r.acier;
        if (r.nbParpaings) totalParpaings += r.nbParpaings;
        if (r.volumeMortier) totalMortier += r.volumeMortier;
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-foreground">
            <HardHat className="h-8 w-8 text-primary" />
            Tableau de bord
          </h1>
          <p className="text-muted-foreground mt-1">
            Aperçu global de vos métrés
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/projects/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Nouveau projet
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="bg-card border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Projets</p>
          <p className="text-2xl font-bold text-foreground">{projects?.length || 0}</p>
        </div>
        <div className="bg-card border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Ouvrages</p>
          <p className="text-2xl font-bold text-foreground">{totalStructures}</p>
        </div>
        <div className="bg-card border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Béton total</p>
          <p className="text-2xl font-bold text-primary">{totalVolume.toFixed(1)} m³</p>
        </div>
        <div className="bg-card border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Acier total</p>
          <p className="text-2xl font-bold text-primary">{totalAcier.toFixed(0)} kg</p>
        </div>
        <div className="bg-card border rounded-md p-4 col-span-2 md:col-span-1">
          <p className="text-sm text-muted-foreground">Parpaings</p>
          <p className="text-2xl font-bold text-foreground">{totalParpaings}</p>
        </div>
      </div>

      {projects && projects.length > 0 ? (
        <div className="rounded-md border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] text-foreground font-semibold">Projet</TableHead>
                <TableHead className="text-foreground font-semibold">Localisation</TableHead>
                <TableHead className="text-foreground font-semibold">Client</TableHead>
                <TableHead className="text-foreground font-semibold">Date</TableHead>
                <TableHead className="text-right text-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium text-foreground">
                    <Link href={`/projects/${project.id}`} className="text-primary hover:underline">
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-foreground">{project.location || "-"}</TableCell>
                  <TableCell className="text-foreground">{project.client || "-"}</TableCell>
                  <TableCell className="text-foreground">
                    {new Date(project.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/${project.id}`}>Ouvrir</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border rounded-md bg-card">
          <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">Aucun projet</h3>
          <p className="text-muted-foreground mt-1">
            Créez votre premier projet pour commencer le métré.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/projects/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau projet
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}