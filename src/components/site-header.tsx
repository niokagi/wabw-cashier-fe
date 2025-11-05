import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useLocation } from "react-router"; 

export function SiteHeader() {
  const { pathname } = useLocation();

  const formatPathname = (path: string) => {
    if (path === "/") {
      return "Cashier Menu";
    }

    const cleanedPath = path.substring(1);
    return cleanedPath.charAt(0).toUpperCase() + cleanedPath.slice(1);
  };

  const pageTitle = formatPathname(pathname);

  return (
    <header className="bg-background sticky top-0 flex h-20 shrink-0 items-center gap-2 z-20 shadow-xs">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
        <div className="ml-auto flex items-center mr-2">
          <NavUser />
        </div>
      </div>
    </header>
  );
}