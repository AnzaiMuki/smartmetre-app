"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const STORAGE_KEY = "quantibtp-onboarding-done";

const steps = [
  {
    target: "btn-new-project",
    title: "Créer un projet",
    description:
      "Commencez par créer votre premier projet de métré. Donnez-lui un nom, une localisation et un client.",
    position: "bottom",
  },
  {
    target: "btn-add-structure",
    title: "Ajouter un ouvrage",
    description:
      "Dans un projet, ajoutez des ouvrages (semelle, poteau, poutre…) et saisissez leurs dimensions.",
    position: "bottom",
  },
  {
    target: "btn-export-pdf",
    title: "Exporter vos résultats",
    description:
      "Téléchargez un rapport PDF ou Excel avec toutes les quantités calculées.",
    position: "top",
  },
  {
    target: "nav-dashboard",
    title: "Tableau de bord",
    description:
      "Retrouvez ici la liste de vos projets et les quantités globales (béton, acier, parpaings).",
    position: "right",
  },
];

export default function OnboardingTutorial() {
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      // Attendre un peu pour que la page se charge
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const complete = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      complete();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (!visible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50" onClick={complete} />

      {/* Tooltip */}
      <div
        className={`relative bg-card text-foreground rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in`}
      >
        <button
          onClick={complete}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          aria-label="Fermer le tutoriel"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Étape {currentStep + 1} sur {steps.length}
          </div>
          <h3 className="text-lg font-bold">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>

          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" onClick={prev} disabled={currentStep === 0}>
              Précédent
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={complete}>
                Ignorer
              </Button>
              <Button onClick={next}>
                {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}