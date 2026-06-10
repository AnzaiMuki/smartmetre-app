import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">SmartMétré</h1>
      <p className="text-lg mb-8">Calcul de métré BTP simplifié</p>
      <Link
        href="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Connexion
      </Link>
      <p className="mt-4">
        Pas encore de compte ?{' '}
        <Link href="/signup" className="text-blue-600 underline">
          S'inscrire
        </Link>
      </p>
    </main>
  );
}