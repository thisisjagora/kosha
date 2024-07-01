"use client";
import { H, P } from "@/components/atoms";
import { HireLabourSequence } from "@/components/forms/sequences";
import { Column, Row } from "@/components/layout";
import { SequencesLayout } from "@/components/layout/sequences";
import { Quotations } from "@/components/quotations";
import { Quotes, QuotesAmount, QuotesContent, QuotesImage, QuotesLabourActivity, QuotesMovers, QuotesMoversDoodles, QuotesRatings, QuotesTitle, QuotesVehicle } from "@/components/quotations/quotes";
import { Tabs, TabsContent, TabsCount, TabsList, TabsTrigger } from "@/components/tabs";
import { HireLabourMock } from "@/mocks";
import useShowQuotes from "@/stores/show-quotes.store";
import { LabourQuote } from "@/types/structs";
import { useState } from "react";

const Page = () => {
      const { showQuote } = useShowQuotes((state) => state)
      const [activeTab, setActiveTab] = useState<string>("dlt");
      return (
            <>
                  {
                        !showQuote && (
                              <SequencesLayout>
                                    <H level={1} className="md:hidden text-center text-primary text-2xl my-6">{getMobileTitle(activeTab)}</H>
                                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                                          <TabsList>
                                                <TabsTrigger className="flex gap-2 " value="dlt">
                                                      <TabsCount count="1" isActive={activeTab === "dlt"} />
                                                      <P className="hidden md:block">Date, Location & Time</P>
                                                </TabsTrigger>
                                                <TabsTrigger className="flex gap-2" value="itm" >
                                                      <TabsCount count="2" isActive={activeTab === "itm"} />
                                                      <P className="hidden md:block"> Items to Move</P>
                                                </TabsTrigger>
                                                <TabsTrigger className="flex gap-2" value="generalInfo">
                                                      <TabsCount count="3" isActive={activeTab === "generalInfo"} />
                                                      <P className="hidden md:block"> Service Requirements</P>
                                                </TabsTrigger>
                                          </TabsList>
                                          <TabsContent value="dlt">
                                                <HireLabourSequence.Step1 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                          <TabsContent value="itm">
                                                <HireLabourSequence.Step2 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                          <TabsContent value="generalInfo">
                                                <HireLabourSequence.Step3 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                    </Tabs>
                              </SequencesLayout>
                        )
                  }
                  <Quotations<LabourQuote> 
                        list={HireLabourMock}
                        renderItem={({index, item}) => (
                              <Quotes key={item.name + index}>
                                    <QuotesImage src="" type="Hire labor" />
                                    <QuotesContent>
                                          <Row className="items-start justify-between gap-6 flex-wrap">
                                                <Column>
                                                <QuotesTitle title={item.name} />
                                                <QuotesMovers>{item.movers} Movers</QuotesMovers>
                                                </Column>
                                                <QuotesMoversDoodles length={item.movers}/>
                                                {/* <QuotesTime className="mt-[4px]">12:00pm - 4:00pm</QuotesTime> */}
                                          </Row>
                                          <Row className="justify-between items-center">
                                                <Column className="gap-1">
                                                      <QuotesLabourActivity activity={item.activity} />
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
            case "dlt":
                        return "Date, Location & Time"
                  break;
            case "itm":
                        return "Items to move"
                  break;
            case "generalInfo":
                        return "Service Requirements"
                  break;
            default:
                  return ""
                  break;
      }
}
export default Page;