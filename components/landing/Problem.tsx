import { AlertTriangle } from "lucide-react";

export default function Problem() {
  return (
    <section id="pourquoi" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Pourquoi QuantiBTP existe
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Les métrés sont encore réalisés sur Excel ou à la main. Cela entraîne
          pertes de temps, erreurs de calcul et difficultés de suivi.
        </p>
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md inline-flex items-center gap-4">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <div className="text-left">
              <p className="font-semibold">2 heures en moyenne</p>
              <p className="text-sm text-muted-foreground">
                pour un métré manuel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}