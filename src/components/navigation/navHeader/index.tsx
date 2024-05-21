import { H, P } from "@/components/atoms"
import { Routes } from "@/core/routing"
import { usePathname } from "next/navigation";

export const NavHeader = () => {
      const path = usePathname();
      const headerContent = switchHeaderContent(path)
      return (
            <div className="flex justify-between gap-4 w-full py-2">
                  <div>
                        <P className="text-blue-300 text-sm">{headerContent.title}</P>
                        <H className="text-blue-200 text-4xl">{headerContent.description}</H>
                  </div>
                  <div></div>
            </div>
      )
}

const switchHeaderContent = (route: string) => {
      switch (route) {
            case Routes.root:
                  return {
                        title: "Home",
                        description: "Schedule a Move"
                  }
            case Routes.bookings:
                  return {
                        title: "Bookings",
                        description: "Bookings Summary"
                  }
            case Routes.messages: 
                  return {
                        title: "",
                        description: "Messages"
                  }
            case Routes.profile:
                  return {
                        title: "",
                        description: "Profile"
                  }
            default: 
                  return {
                        title: "",
                        description: ""
                  }
      }
}