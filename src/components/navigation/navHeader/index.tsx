import { Button, H, P } from "@/components/atoms"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Column, Row } from "@/components/layout";
import { Notification } from "@/components/notification";
import { Routes } from "@/core/routing"
import { generateAcronym } from "@/lib/helpers/generateAcronym";
import useShowQuotes from "@/stores/show-quotes.store";
import useUserStore from "@/stores/user.store";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNav } from "../mobileNav";

export const NavHeader = () => {
      const {user} =  useUserStore((state) => state);
      const path = usePathname();
      const showQuote = useShowQuotes((state) => state.showQuote);
      const [headerContent, setHeaderContent] = useState({ title: "", description: "" });

      useEffect(() => {
        setHeaderContent(switchHeaderContent(path, showQuote));
      }, [path, showQuote]);

      return (
            <Row className="justify-between items-center gap-4 w-full py-2">
                  <MobileNav 
                    trigger={(
                      <Button variant="ghost" className="font-medium text-grey-300 text-lg lg:hidden">
                        <MenuIcon className="w-[22px] h-[22px] text-primary block mr-2" />
                        {/* <P>{headerContent.title}</P> */}
                      </Button>
                    )}
                  />
                  <Column className="flex-1 hidden lg:block">
                        <P className="text-blue-300 text-sm">{headerContent.title}</P>
                        <H className="text-blue-200 text-4xl">{headerContent.description}</H>
                  </Column>
                  <Row className="flex-1 bg-white-100 p-4 items-center justify-between max-w-[120px] max-h-[60px] rounded-[30px]">
                        <Notification />
                        <Avatar className="w-[40px] h-[40px] bg-[#F6DF9C]">
                            <AvatarImage src={ user?.photoURL || "https://images.unsplash.com/photo-1715005881129-266ccdd75e43?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={(user?.fullName || user?.displayName) ?? ""}/>
                            <AvatarFallback>{generateAcronym((user?.fullName || user?.displayName) ?? "")}</AvatarFallback>
                        </Avatar>
                  </Row>
            </Row>
      )
}

const switchHeaderContent = (route: string, isQuotesVisible: boolean) => {
      const messagesRouteMatch = route.match(/^\/messages\/([^/]+)$/);
    
      if (messagesRouteMatch) {
        return {
            title: "",
            description: "Messages"
        };
      }
    
      switch (route) {
        case Routes.root:
          return {
            title: "Home",
            description: "Dashboard"
          };
        case Routes.sequence.bookMove:
          return {
            title: isQuotesVisible? "Home/Best Moving Options" : "Home",
            description: isQuotesVisible? "Quotes from Moving Vendors" : "Schedule a Move"
          };
        case Routes.sequence.hireLabour:
          return {
            title: isQuotesVisible? "Home/Best Labour Options" : "Home",
            description: isQuotesVisible? "Quotes from Labour Vendors" : "Hire Labour only"
          };
        case Routes.sequence.bookDelivery:
          return {
            title: isQuotesVisible? "Home/Best Delivery Options" : "Home",
            description: isQuotesVisible? "Quotes from Delivery Vendors" : "Schedule your Delivery"
          };
        case Routes.bookings:
          return {
            title: "Bookings",
            description: "Bookings Summary"
          };
        case Routes.messages:
          return {
            title: "",
            description: "Messages"
          };
        case Routes.profile:
          return {
            title: "",
            description: "Profile"
          };
        default:
          return {
            title: "",
            description: ""
          };
      }
    };
    