import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function SearchPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Rechercher</h1>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Recherche de projets et ouvrages
          </CardTitle>
          <CardDescription>
            Cette fonctionnalité sera disponible prochainement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un projet..."
              className="pl-10"
              disabled
            />
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Vous pourrez bientôt filtrer vos projets par nom, localisation ou type d'ouvrage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}