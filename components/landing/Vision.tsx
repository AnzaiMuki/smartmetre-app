import { CheckCircle } from "lucide-react";

export default function Vision() {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Et demain ?</h2>
        <p className="text-secondary-foreground/80 mb-8">
          Nous construisons l'avenir du métré BTP.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-left max-w-md mx-auto">
          {[
            "Estimation financière",
            "Bordereau quantitatif",
            "Intelligence artificielle",
            "Lecture de plans PDF",
            "Génération de devis",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}