"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MenuButton = () => {
  const pathname = usePathname();

  if (pathname === "/translations") {
    return (
      <Link
        className="mr-2 border rounded-md p-2 text-amber-900 font-medium"
        href="/"
      >
        Translate New
      </Link>
    );
  }
  return (
    <Link
      className="mr-2 border rounded-md p-2 text-amber-900 font-medium"
      href="/translations"
    >
      My Translations
    </Link>
  );
};