import { Button, H, P } from "@/components/atoms"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Column, Row } from "@/components/layout";
import { Notification } from "@/components/notification";
import { Routes } from "@/core/routing"
import { usePathname } from "next/navigation";

export const NavHeader = () => {
      const path = usePathname();
      const headerContent = switchHeaderContent(path)
      return (
            <Row className="justify-between items-center gap-4 w-full py-2">
                  <Column className="flex-1">
                        <P className="text-blue-300 text-sm">{headerContent.title}</P>
                        <H className="text-blue-200 text-4xl">{headerContent.description}</H>
                  </Column>
                  <Row className="flex-1 bg-white-100 p-4 items-center justify-between max-w-[120px] max-h-[60px] rounded-[30px]">
                        <Notification />
                        <Avatar className="w-[40px] h-[40px] bg-[#F6DF9C]">
                              <AvatarImage src="https://images.unsplash.com/photo-1715005881129-266ccdd75e43?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nelson Michael"/>
                              <AvatarFallback>WC</AvatarFallback>
                        </Avatar>
                  </Row>
            </Row>
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