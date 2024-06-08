"use client";
import { P } from "@/components/atoms";
import { BookMoveSequence } from "@/components/forms/sequences";
import { Column, Row } from "@/components/layout";
import { SequencesLayout } from "@/components/layout/sequences";
import { Quotations } from "@/components/quotations";
import { Quotes, QuotesAmount, QuotesContent, QuotesImage, QuotesMovers, QuotesMoversDoodles, QuotesRatings, QuotesTime, QuotesTitle, QuotesVehicle } from "@/components/quotations/quotes";
import { Tabs, TabsContent, TabsCount, TabsList, TabsTrigger } from "@/components/tabs";
import { BookMoveMock } from "@/mocks";
import { MoveQuote } from "@/types/structs";
import { useState } from "react";

const Page = () => {
      const [activeTab, setActiveTab] = useState<string>("dateAndTime");
      const [showQuotes, setShowQuotes] = useState<boolean>(true)
      return (
            <>
                  <SequencesLayout>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                              <TabsList>
                                    <TabsTrigger className="flex gap-2" value="dateAndTime">
                                          <TabsCount count="1" isActive={activeTab === "dateAndTime"} />
                                          Date & Time
                                    </TabsTrigger>
                                    <TabsTrigger className="flex gap-2" value="propertyDetail" >
                                          <TabsCount count="2" isActive={activeTab === "propertyDetail"} />
                                          Property Detail
                                    </TabsTrigger>
                                    <TabsTrigger className="flex gap-2" value="generalInfo">
                                          <TabsCount count="3" isActive={activeTab === "generalInfo"} />
                                          General Info
                                    </TabsTrigger>
                                    <TabsTrigger className="flex gap-2" value="serviceRequirement">
                                          <TabsCount count="4" isActive={activeTab === "serviceRequirement"} />
                                          Service Requirement
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
                  <Quotations<MoveQuote> 
                        showQuotes={showQuotes} 
                        list={BookMoveMock}
                        renderItem={({index, item}) => (
                              <Quotes key={item.vehicle + index}>
                                    <QuotesImage src="" type="Hire labor" />
                                    <QuotesContent>
                                          <Row className="items-start justify-between gap-6 flex-wrap">
                                                <Column>
                                                <QuotesTitle>{item.name}</QuotesTitle>
                                                <QuotesMovers>{item.movers} Movers</QuotesMovers>
                                                </Column>
                                                <QuotesMoversDoodles length={item.movers}/>
                                                {/* <QuotesTime className="mt-[4px]">12:00pm - 4:00pm</QuotesTime> */}
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

export default Page;