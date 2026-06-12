import { CheckCircle, XCircle } from "lucide-react";

export default function Solution() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div className="bg-destructive/5 rounded-xl p-8 border border-destructive/20">
          <h3 className="text-xl font-bold text-destructive mb-4">Avant</h3>
          <ul className="space-y-3">
            {["Excel manuel", "Calculs longs", "Erreurs fréquentes", "Temps : 2h"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
          <h3 className="text-xl font-bold text-primary mb-4">Avec QuantiBTP</h3>
          <ul className="space-y-3">
            {["Calcul automatique", "Résultats fiables", "Exports PDF/Excel", "Temps : 2 min"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}