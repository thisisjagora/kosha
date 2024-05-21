import { usePathname } from "next/navigation"

export const useActiveRoute = () => {
      const path = usePathname();

      const isActiveRoute = (currentPath: string):  boolean  => {
            return currentPath === path
      }
      return {isActiveRoute};
}