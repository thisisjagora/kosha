import { FC } from "react";
import { Button, H, P } from "@/components/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Column, Row } from "@/components/layout";
import { Notification } from "@/components/notification";
import { Routes } from "@/core/routing";
import { generateAcronym } from "@/lib/helpers/generateAcronym";
import useShowQuotes from "@/stores/show-quotes.store";
import useUserStore from "@/stores/user.store";
import { ArrowBigLeftDash, ArrowLeft, MenuIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNav } from "../mobileNav";
import Link from "next/link";
import { useValidRoute } from "@/hooks/useValidRoute";

export const NavHeader: FC<{ nonAuth?: boolean }> = ({ nonAuth }) => {
  const { isValidRoute } = useValidRoute([
    Routes.bookMoveQuoteDetails,
    Routes.hireLabourQuoteDetails
  ]);
  const router = useRouter();
  const { user } = useUserStore((state) => state);
  const path = usePathname();
  const showQuote = useShowQuotes((state) => state.showQuote);
  const [headerContent, setHeaderContent] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setHeaderContent(switchHeaderContent(path, showQuote));
  }, [path, showQuote]);

  return (
    <Row className="justify-between items-center gap-4 w-full py-2">
      <MobileNav
        trigger={
          <Button
            variant="ghost"
            className="font-medium text-grey-300 text-lg lg:hidden"
          >
            <MenuIcon className="w-[22px] h-[22px] text-primary block mr-2" />
            <P>{headerContent.title}</P>
          </Button>
        }
      />
      <Row className="flex-1 items-center gap-4">
      <Column className="hidden lg:block">
        <P className="text-blue-300 text-sm">{headerContent.title}</P>
        <H className="text-blue-200 text-4xl">{headerContent.description}</H>
      </Column>
      {
        isValidRoute && (
          <Row onClick={() => router.back()} className="items-center border p-2 rounded-md hover:cursor-pointer">
          <ArrowLeft className="text-primary text-sm" />
          <P className="text-primary text-sm">Go back</P>
        </Row>
        )
      }
      </Row>
      {nonAuth ? (
        <Column>
          <Link href="/auth/sign-in" className="border bg-primary text-white-500 p-2 px-4 rounded-lg">
            Sign In
          </Link>
        </Column>
      ) : (
        <Row className="flex-1 bg-white-100 p-4 items-center justify-between max-w-[120px] max-h-[60px] rounded-[30px]">
          <Notification />
          <Avatar className="w-[40px] h-[40px] bg-[#F6DF9C]">
            <AvatarImage
              src={
                user?.photoURL ?? ""
              }
              alt={(user?.fullName || user?.displayName) ?? ""}
            />
            <AvatarFallback>
              {generateAcronym((user?.fullName || user?.displayName) ?? "")}
            </AvatarFallback>
          </Avatar>
        </Row>
      )}
    </Row>
  );
};

const switchHeaderContent = (route: string, isQuotesVisible: boolean) => {
  const messagesRouteMatch = route.match(/^\/messages\/([^/]+)$/);

  if (messagesRouteMatch) {
    return {
      title: "",
      description: "Messages",
    };
  }

  switch (route) {
    case Routes.root:
      return {
        title: "Home",
        description: "Dashboard",
      };
    case Routes.sequence.bookMove:
      return {
        title: "Home",
        description: "Schedule a Move",
      };
    case Routes.sequence.hireLabour:
      return {
        title: "Home",
        description: "Hire Labour only",
      };
    case Routes.sequence.bookDelivery:
      return {
        title: isQuotesVisible ? "Home/Best Delivery Options" : "Home",
        description: isQuotesVisible
          ? "Quotes from Delivery Vendors"
          : "Schedule your Delivery",
      };
    case Routes.bookMoveQuotes:
      return {
        title: "Home/Best Moving Options",
        description: "Quotes from Moving Vendors",
      };
    case Routes.bookMoveQuoteDetails:
      return {
        title: "Home/Best Moving Options",
        description: "Quote Details",
      };
    case Routes.hireLabourQuotes:
      return {
        title: "Home/Best Labour Options",
        description: "Quotes from Labour Vendors",
      };
    case Routes.hireLabourQuoteDetails:
      return {
        title: "Home/Best Moving Options",
        description: "Quote Details",
      };
    case Routes.bookings:
      return {
        title: "Bookings",
        description: "Bookings Summary",
      };
    case Routes.messages:
      return {
        title: "",
        description: "Messages",
      };
    case Routes.profile:
      return {
        title: "",
        description: "Profile",
      };
    default:
      return {
        title: "",
        description: "",
      };
  }
};
