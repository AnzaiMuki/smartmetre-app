"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewProject() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Vous devez être connecté.");
      return;
    }

    const { error } = await supabase.from("projects").insert({
      user_id: user.id,
      name,
      location,
      client,
      date,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Projet créé avec succès.");
      router.push("/dashboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Nouveau projet</h1>
      </div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Créer un projet</CardTitle>
          <CardDescription>
            Renseignez les informations générales du projet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom du projet *</Label>
              <Input
                id="name"
                placeholder="Ex: Villa R+1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                placeholder="Ex: Cotonou"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="client">Maître d'ouvrage (client)</Label>
              <Input
                id="client"
                placeholder="Nom du client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Créer le projet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}