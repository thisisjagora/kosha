"use client";
import { Activity, LeftColumn, RightColumn } from "@/components/activity";
import { Button, H, P, Picture } from "@/components/atoms";
import { Calendar } from "@/components/calendar";
import { Column, Row } from "@/components/layout";
import { MoveHistory } from "@/components/moveHistory";
import { Quotes, QuotesAmount, QuotesContent, QuotesImage, QuotesMovers, QuotesTime, QuotesTitle, QuotesVehicle } from "@/components/quotations/quotes";
import { Routes } from "@/core/routing";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const SERVICES = [
  {
    label: "Book a Move",
    route: Routes.sequence.bookMove,
    icon: "/images/book-move.png"
  },
  {
    label: "Hire Labor",
    route: Routes.sequence.hireLabour,
    icon: "/images/hire-labor.png"
  },
  {
    label: "Book a Delivery",
    route: Routes.sequence.bookDelivery,
    icon: "/images/book-delivery.png"
  }
]

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <Row className="gap-8">
      <Column className="flex-1 gap-8">
        <Activity>
          <LeftColumn>
            <H level={3} className="text-2xl">Delivery Quote received!</H>
            <P className="font-dm-sans">You have received an estimate for your delivery request</P>
            <Button className="bg-white-100 max-w-[120px] text-primary">View</Button>
          </LeftColumn>  
          <RightColumn >
            <Picture 
              container={{
                className: "w-full h-full"
              }}
              image={{
                alt: "",
                src: "/images/send.png",
              }}
            />
          </RightColumn>
        </Activity>        
        <Column className="gap-4">
          <H level={3} className="text-primary text-2xl">Select a Service</H>
          <Row>
            {
              SERVICES.map((item, index) => (
                <Link key={item.label + index} href={item.route} className="flex-1 group">
                    <div key={item.label + index} className="relative w-full h-[120px] bg-primary rounded-xl group-hover:scale-[1.01] transition-transform ease-linear duration-200">
                      <div className="h-full relative">
                        <Picture 
                          container={{
                            className: cn("w-[80px] h-[60px] relative right-0 absolute bottom-0", {
                              "-right-4 w-[110px] h-[70px]" : index === 2
                            })
                          }}
                          image={{
                            alt: "",
                            src: item.icon
                          }}
                        />
                      </div>
                      <H level={5} className="absolute top-[50%] translate-y-[-50%] left-6 text-white-100 text-lg">{item.label}</H>
                    </div>
                </Link>
              ))
            }
          </Row>
        </Column>
        <Column className="gap-4">
          <H level={3} className="text-primary text-2xl">Todays Activities</H>
          {/* <Row className="flex-wrap gap-4">
            <Quotes>
              <QuotesImage src="" type="Hire labor" />
              <QuotesContent>
                <Row className="items-start justify-between gap-6 flex-wrap">
                  <Column>
                    <QuotesTitle>Tiyendi Movers</QuotesTitle>
                    <QuotesMovers>3 Movers</QuotesMovers>
                  </Column>
                  <QuotesTime className="mt-[4px]">12:00pm - 4:00pm</QuotesTime>
                </Row>
                <Row className="justify-between items-center">
                  <QuotesVehicle>Pickup, Van, 16ft Truck...</QuotesVehicle>
                  <QuotesAmount amount="80"/>
                </Row>
              </QuotesContent>
            </Quotes>
            <Quotes>
              <QuotesImage src="" type="Hire labor" />
              <QuotesContent>
                <Row className="items-start justify-between gap-6 flex-wrap">
                  <Column>
                    <QuotesTitle>Tiyendi Movers</QuotesTitle>
                    <QuotesMovers>3 Movers</QuotesMovers>
                  </Column>
                  <QuotesTime className="mt-[4px]">12:00pm - 4:00pm</QuotesTime>
                </Row>
                <Row className="justify-between items-center">
                  <QuotesVehicle>Pickup, Van, 16ft Truck...</QuotesVehicle>
                  <QuotesAmount amount="80"/>
                </Row>
              </QuotesContent>
            </Quotes>
            <Quotes>
              <QuotesImage src="" type="Hire labor" />
              <QuotesContent>
                <Row className="items-start justify-between gap-6 flex-wrap">
                  <Column>
                    <QuotesTitle>Tiyendi Movers</QuotesTitle>
                    <QuotesMovers>3 Movers</QuotesMovers>
                  </Column>
                  <QuotesTime className="mt-[4px]">12:00pm - 4:00pm</QuotesTime>
                </Row>
                <Row className="justify-between items-center">
                  <QuotesVehicle>Pickup, Van, 16ft Truck...</QuotesVehicle>
                  <QuotesAmount amount="80"/>
                </Row>
              </QuotesContent>
            </Quotes>
          </Row> */}
        </Column>
      </Column>
      <Column className="flex-1 max-w-[350px] gap-8">
        <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={date}
            onSelect={setDate}
            disabled={(date: Date) => date < new Date("1900-01-01")}
            initialFocus
            className="rounded-xl shadow-sm w-full border"
        />
        <Column className="bg-white-100 shadow-sm rounded-xl p-4 gap-8">
            <Column className="gap-2">
              <H level={3} className="m-0 p-0 text-primary font-bold text-2xl">Move History</H>
              <P className="m-0 p-0 text-primary-foreground">Here you can find all your transactions on this account and you can print them out as .pdf or .csv file</P>
            </Column>
            <Column>
              <MoveHistory status="Pending" type="Hire labor" />
            </Column>
        </Column>
      </Column>
    </Row>
  );
}
