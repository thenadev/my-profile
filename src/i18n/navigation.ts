import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-bewusste Navigation: intern immer diese Exporte statt
// next/link bzw. next/navigation verwenden, damit das /en-Präfix
// bei der Navigation erhalten bleibt.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
