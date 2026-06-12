export default function Footer() {
  return (
    <footer className="py-6 border-t text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} QuantiBTP — Tous droits réservés.
    </footer>
  );
}