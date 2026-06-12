import { MapPin, Banknote, Smartphone, Wifi } from "lucide-react";

export default function Afrique() {
  const features = [
    { icon: Banknote, text: "Franc CFA (XOF)" },
    { icon: MapPin, text: "Normes locales" },
    { icon: Smartphone, text: "Mobile chantier" },
    { icon: Wifi, text: "Connexion limitée" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Conçu pour les professionnels du BTP en Afrique de l'Ouest
        </h2>
        <p className="text-muted-foreground mb-10">
          Pensé pour vos réalités : monnaie locale, faible connectivité, mobilité.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.text} className="bg-muted/50 rounded-xl p-6">
              <f.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}