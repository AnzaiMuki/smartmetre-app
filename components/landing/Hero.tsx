"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Ruler, HardHat } from "lucide-react";

export default function Hero() {
  const [longueur, setLongueur] = useState(5);
  const [largeur, setLargeur] = useState(3);
  const [hauteur, setHauteur] = useState(0.5);
  const [results, setResults] = useState<{
    volume: number;
    acier: number;
    coffrage: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const volume = longueur * largeur * hauteur;
    const coffrage = 2 * hauteur * (longueur + largeur);
    const acier = volume * 80; // kg/m³
    setResults({ volume, coffrage, acier });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white py-20 md:py-32">
      {/* Fond technique (lignes de plans) */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Colonne gauche : slogan + démo */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary">
            Calculez béton, acier
            <br />
            et maçonnerie
            <br />
            <span className="text-primary">sans Excel.</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Le métré BTP devient instantané. Saisissez vos dimensions et obtenez
            volumes, acier, coffrage.
          </p>

          {/* Mini démo interactive */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <form onSubmit={handleCalculate} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Long. (m)</label>
                    <Input
                      type="number"
                      value={longueur}
                      onChange={(e) => setLongueur(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Larg. (m)</label>
                    <Input
                      type="number"
                      value={largeur}
                      onChange={(e) => setLargeur(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Haut. (m)</label>
                    <Input
                      type="number"
                      value={hauteur}
                      onChange={(e) => setHauteur(Number(e.target.value))}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Calculer
                </Button>
              </form>
              {results && (
                <div className="mt-4 p-3 bg-muted rounded-md grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="font-bold text-primary">{results.volume.toFixed(2)} m³</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Acier</p>
                    <p className="font-bold text-primary">{results.acier.toFixed(0)} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Coffrage</p>
                    <p className="font-bold text-primary">{results.coffrage.toFixed(2)} m²</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/signup">Commencer gratuitement</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#pourquoi">Voir la démo</a>
            </Button>
          </div>
        </div>

        {/* Colonne droite : dashboard factice */}
        <div className="hidden md:block">
          <Card className="shadow-xl border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-secondary">Projet Villa Duplex</h3>
                <span className="text-xs text-muted-foreground">Aujourd'hui</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Ouvrages</p>
                  <p className="text-xl font-bold">24</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Béton</p>
                  <p className="text-xl font-bold">32.4 m³</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Acier</p>
                  <p className="text-xl font-bold">2 560 kg</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Coffrage</p>
                  <p className="text-xl font-bold">128 m²</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-primary/5 rounded-md">
                <p className="text-xs text-muted-foreground">Dernière modification</p>
                <p className="text-sm font-medium">Il y a 2 heures</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}