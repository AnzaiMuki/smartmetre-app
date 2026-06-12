import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Banknote, Globe, Hammer, CheckCircle } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Génération d'un avatar via initiales (solution simple sans dépendance)
  const initials = user?.email?.substring(0, 2).toUpperCase() || "U";
  const displayName = user?.email?.split("@")[0] || "Utilisateur";

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>

      {/* Profil compact */}
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            {initials}
          </div>
          <div>
            <p className="font-medium">{displayName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ingénieur / Technicien
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Grille 2 colonnes */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Monnaie */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              Monnaie par défaut
            </CardTitle>
            <CardDescription>Utilisée pour les estimations financières</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">F CFA (XOF)</p>
            <p className="text-sm text-muted-foreground mt-1">
              D'autres devises seront disponibles prochainement.
            </p>
          </CardContent>
        </Card>

        {/* Langue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Langue et région
            </CardTitle>
            <CardDescription>Interface adaptée à l'Afrique de l'Ouest</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">Français</p>
            <p className="text-sm text-muted-foreground mt-1">
              Optimisé pour les professionnels du BTP.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Préférences de calcul */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hammer className="h-5 w-5 text-primary" />
            Préférences de calcul
          </CardTitle>
          <CardDescription>
            Personnalisez vos calculs de métré
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-primary" defaultChecked />
            <span>Arrondi automatique des quantités</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-primary" defaultChecked />
            <span>Afficher les décimales (précision 0.01)</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-primary" defaultChecked />
            <span>Calcul acier estimatif (ratio standard)</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-primary" defaultChecked />
            <span>Génération PDF détaillée</span>
          </label>
        </CardContent>
      </Card>

      {/* À venir */}
      <Card className="border-dashed border-primary/40 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            Fonctionnalités à venir
          </CardTitle>
          <CardDescription>
            Nous construisons l'avenir du métré BTP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Estimation financière
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Bibliothèque de prix
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              IA de lecture de plans
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Bordereau quantitatif
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Génération de devis
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}