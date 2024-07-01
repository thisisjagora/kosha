"use client";
import { H, P } from "@/components/atoms";
import { BookMoveSequence } from "@/components/forms/sequences";
import { Column, Row } from "@/components/layout";
import { SequencesLayout } from "@/components/layout/sequences";
import { Quotations } from "@/components/quotations";
import { Quotes, QuotesAmount, QuotesContent, QuotesImage, QuotesMovers, QuotesMoversDoodles, QuotesRatings, QuotesTime, QuotesTitle, QuotesVehicle } from "@/components/quotations/quotes";
import { Tabs, TabsContent, TabsCount, TabsList, TabsTrigger } from "@/components/tabs";
import { BookMoveMock } from "@/mocks";
import useShowQuotes from "@/stores/show-quotes.store";
import { MoveQuote } from "@/types/structs";
import { useEffect, useState } from "react";

const Page = () => {
      const { showQuote } = useShowQuotes((state) => state)
      const [activeTab, setActiveTab] = useState<string>("dateAndTime");

      const [isMounted, setIsMounted] = useState(false);

      useEffect(() => {
        setIsMounted(true);
      }, []);
    
      if (!isMounted) return null;

      return (
            <>
                  {
                        !showQuote && (
                              <SequencesLayout>
                                     <H level={1} className="md:hidden text-center text-primary text-2xl my-6">{getMobileTitle(activeTab)}</H>
                                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                                          <TabsList>
                                                <TabsTrigger className="flex gap-2" value="dateAndTime">
                                                      <TabsCount count="1" isActive={activeTab === "dateAndTime"} />
                                                      <P className="hidden md:block">Date & Time</P>
                                                </TabsTrigger>
                                                <TabsTrigger className="flex gap-2" value="propertyDetail" >
                                                      <TabsCount count="2" isActive={activeTab === "propertyDetail"} />
                                                      <P className="hidden md:block">Property Detail</P>
                                                </TabsTrigger>
                                                <TabsTrigger className="flex gap-2" value="generalInfo">
                                                      <TabsCount count="3" isActive={activeTab === "generalInfo"} />
                                                      <P className="hidden md:block">General Info</P>
                                                </TabsTrigger>
                                                <TabsTrigger className="flex gap-2" value="serviceRequirement">
                                                      <TabsCount count="4" isActive={activeTab === "serviceRequirement"} />
                                                      <P className="hidden md:block">Service Requirement</P>
                                                </TabsTrigger>
                                          </TabsList>
                                          <TabsContent value="dateAndTime">
                                                <BookMoveSequence.Step1 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                          <TabsContent value="propertyDetail">
                                                <BookMoveSequence.Step2 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                          <TabsContent value="generalInfo">
                                                <BookMoveSequence.Step3 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                          <TabsContent value="serviceRequirement">
                                                <BookMoveSequence.Step4 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                    </Tabs>
                              </SequencesLayout>
                        )
                  }
                  <Quotations<MoveQuote> 
                        list={BookMoveMock}
                        renderItem={({index, item}) => (
                              <Quotes key={item.vehicle + index}>
                                    <QuotesImage src="" type="Book a move" />
                                    <QuotesContent>
                                          <Row className="items-start justify-between gap-6 flex-wrap">
                                                <Column>
                                                <QuotesTitle title={item.name} />
                                                <QuotesMovers>{item.movers} Movers</QuotesMovers>
                                                </Column>
                                                <QuotesMoversDoodles length={item.movers}/>
                                          </Row>
                                          <Row className="justify-between items-center">
                                                <Column className="gap-1">
                                                      <QuotesVehicle>{item.vehicle}</QuotesVehicle>
                                                      <QuotesRatings rating={item.rating}/>
                                                </Column>
                                                <QuotesAmount amount={item.amount}/>
                                          </Row>
                                    </QuotesContent>
                              </Quotes>
                        )}
                  />
            </>
      )
}

const getMobileTitle = (active: string): string => {
      switch (active) {
            case "dateAndTime":
                        return "Schedule a Move"
                  break;
            case "propertyDetail":
                        return "Pickup Details"
                  break;
            case "generalInfo":
                        return "Additional Items"
                  break;
            case "serviceRequirement":
                        return "Service Requirements"
                  break;
            default:
                  return ""
                  break;
      }
}

export default Page;