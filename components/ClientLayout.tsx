"use client";

import { usePathname } from "next/navigation";
import { NavigationBar } from "./NavigationBar";
import OnboardingTutorial from "./OnboardingTutorial";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      {/* Desktop : sidebar fixe + contenu décalé */}
      <div className="hidden md:block">
        <NavigationBar />
      </div>
      <div className="hidden md:block md:pl-64">
        <main className="p-4 md:p-8">{children}</main>
      </div>
      {/* Mobile : contenu avec padding en bas pour la barre */}
      <div className="md:hidden">
        <main className="p-4 pb-24">{children}</main>
        <NavigationBar />
      </div>

      {/* Tutoriel onboarding */}
      <OnboardingTutorial />
    </div>
  );
}