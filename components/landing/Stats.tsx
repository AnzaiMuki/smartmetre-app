export default function Stats() {
  const items = [
    { value: "250+", label: "ouvrages calculés" },
    { value: "1000+", label: "m³ de béton estimés" },
    { value: "PDF & Excel", label: "exports instantanés" },
    { value: "5", label: "types d'ouvrages intégrés" },
  ];

  return (
    <section className="py-12 border-b">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-3xl font-bold text-primary">{item.value}</p>
            <p className="text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}