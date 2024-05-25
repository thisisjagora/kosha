import { Picture } from "@/components/atoms"
import { NavItem } from "."
import { useActiveRoute } from "@/hooks/useActiveRoute"
import { Calendar, Chat, Home, User } from "@/components/Icons";
import { Routes } from "@/core/routing";
import { usePathname } from "next/navigation";

export const SideNav = () => {
      const { isActiveRoute } = useActiveRoute();
      const path = usePathname();
      const sizes = {
            width: 22,
            height: 22
      }
      const sequenceRoutes = Object.values(Routes.sequence)

      const SIDE_NAV_MENU_DATA = [
            {
                  title: "Dashboard",
                  icon: <Home {...sizes} invertColor={isActiveRoute(Routes.root) || sequenceRoutes.includes(path) } />,
                  route: Routes.root
            },
            {
                  title: "Bookings",
                  icon: <Calendar {...sizes} invertColor={isActiveRoute(Routes.bookings)} />,
                  route: Routes.bookings
            },
            {
                  title: "Messages",
                  icon: <Chat {...sizes} invertColor={isActiveRoute(Routes.messages)} />,
                  route: Routes.messages
            },
            {
                  title: "Profile",
                  icon: <User {...sizes} invertColor={isActiveRoute(Routes.profile)} />,
                  route: Routes.profile
            },
      ]
      return (
            <aside className="bg-primary h-full flex flex-col gap-6">
                  <div className="px-4 pt-8 pb-12">
                        <Picture 
                              container={{
                                    className: "w-full max-w-[130px] h-[34px]"
                              }}
                              image={{
                                    alt: "",
                                    src: "/images/Logo.png"
                              }}
                        />
                  </div>
                  <div className="py-6 flex flex-col gap-4">
                              {
                                    SIDE_NAV_MENU_DATA.map((item, indx) => <NavItem key={item.title + indx} data={{...item, isActive: isActiveRoute(item.route) || (item.route === Routes.root && sequenceRoutes.includes(path))}} />)
                              }
                  </div>
            </aside>
      )
}