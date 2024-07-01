"use client"
import { Activity, LeftColumn, RightColumn } from "@/components/activity";
import { Button, H, P, Picture } from "@/components/atoms";
import { Calendar } from "@/components/calendar";
import { Column, Row } from "@/components/layout";
import { useState } from "react";

const Page = () => {
      const [date, setDate] = useState<Date | undefined>(new Date())
      return (
            <Row className="gap-8 flex-col md:flex-row">
              <Column className="flex-1 gap-8">
                <Activity>
                  <LeftColumn className="gap-8">
                    <H level={3} className="text-2xl md:text-3xl">Delivery Quote received!</H>
                    <P className="text-sm">You have received an estimate for your delivery request</P>
                    <Row className="gap-4">
                          <Button className="flex-1 bg-white-100 max-w-[120px] text-primary">View</Button>
                          <Button variant="ghost" className="flex-1  max-w-[120px]">Discard</Button>
                    </Row>
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
              <Column className="flex-1 sm:max-w-[500px] md:max-w-[350px] gap-8">
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date: Date) => date < new Date("1900-01-01")}
                    initialFocus
                    className="rounded-xl shadow-custom bg-white-100 w-full"
                />
              </Column>
            </Row>
      )
}

export default Page;