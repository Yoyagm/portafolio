import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// APIs de navegación conscientes del locale y de los pathnames localizados.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
