import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calculator,
  FileText,
  Smartphone,
  Ruler,
  BrickWall,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="px-4 py-20 md:py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Métré BTP intelligent
            <br />
            pour ingénieurs et techniciens
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculez automatiquement vos quantités de béton, coffrage, acier et maçonnerie en quelques secondes.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Gain de temps",
              "Export PDF & Excel",
              "Accessible sur mobile",
              "Compatible chantiers Afrique de l'Ouest",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-base">
              <Link href="/signup">Commencer gratuitement</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <a href="#pourquoi">Voir une démonstration</a>
            </Button>
          </div>
        </div>

        {/* Illustration tableau métré */}
        <div className="bg-white rounded-xl shadow-lg border p-6 space-y-3">
          <p className="font-semibold text-foreground">Projet : Villa R+1</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left pb-2">Ouvrage</th>
                <th className="text-right pb-2">Volume béton</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Semelle", vol: "5.6 m³" },
                { name: "Poteau", vol: "1.2 m³" },
                { name: "Poutre", vol: "3.4 m³" },
                { name: "Dalle", vol: "8.7 m³" },
              ].map((item) => (
                <tr key={item.name} className="border-b last:border-0">
                  <td className="py-1">{item.name}</td>
                  <td className="text-right font-medium">{item.vol}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-right font-bold text-primary">
            Total béton : 18.9 m³
          </p>
        </div>
      </section>

      {/* POURQUOI */}
      <section id="pourquoi" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">
            Pourquoi QuantiBTP ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: "Calcul automatique",
                desc: "Fini les erreurs Excel. Les quantités sont calculées automatiquement selon les règles de l'art.",
              },
              {
                icon: FileText,
                title: "Export professionnel",
                desc: "Générez vos rapports PDF et Excel en un clic, prêts à être transmis.",
              },
              {
                icon: Smartphone,
                title: "Mobile chantier",
                desc: "Saisissez vos ouvrages directement sur le terrain, même sans connexion.",
              },
            ].map((item) => (
              <Card key={item.title} className="text-left">
                <CardContent className="p-6 space-y-3">
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES D'OUVRAGES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">
            Types d'ouvrages pris en charge
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Ruler, label: "Semelle" },
              { icon: Ruler, label: "Poteau" },
              { icon: Ruler, label: "Poutre" },
              { icon: Ruler, label: "Dalle" },
              { icon: BrickWall, label: "Mur Agglos" },
            ].map((item) => (
              <Card key={item.label} className="p-6 flex flex-col items-center gap-3 hover:shadow-md transition-shadow">
                <item.icon className="h-8 w-8 text-primary" />
                <span className="font-medium text-foreground">{item.label}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* APERÇU DASHBOARD */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Vue d'ensemble de vos projets
          </h2>
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-4">Projet</th>
                  <th className="text-left p-4">Localisation</th>
                  <th className="text-right p-4">Ouvrages</th>
                  <th className="text-right p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Villa R+1", loc: "Cotonou", nb: 32, date: "12/06" },
                  { name: "École", loc: "Porto-Novo", nb: 85, date: "10/06" },
                ].map((proj) => (
                  <tr key={proj.name} className="border-b last:border-0">
                    <td className="p-4 font-medium">{proj.name}</td>
                    <td className="p-4">{proj.loc}</td>
                    <td className="p-4 text-right">{proj.nb}</td>
                    <td className="p-4 text-right">{proj.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            Comment ça marche ?
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {[
              "Créez un projet",
              "Ajoutez les ouvrages",
              "Obtenez les quantités",
              "Exportez PDF / Excel",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <span className="mt-2 text-sm font-medium">{step}</span>
                </div>
                {i < 3 && (
                  <ArrowRight className="hidden md:block h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button asChild size="lg">
              <Link href="/signup">Démarrer maintenant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER simple */}
      <footer className="py-6 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} QuantiBTP — Tous droits réservés.
      </footer>
    </div>
  );
}