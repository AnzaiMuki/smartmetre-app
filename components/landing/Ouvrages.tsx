import { Ruler, BrickWall } from "lucide-react";

const items = [
  { icon: Ruler, label: "Semelle" },
  { icon: Ruler, label: "Poteau" },
  { icon: Ruler, label: "Poutre" },
  { icon: Ruler, label: "Dalle" },
  { icon: BrickWall, label: "Mur Agglos" },
];

export default function Ouvrages() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Types d'ouvrages pris en charge</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {items.map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}