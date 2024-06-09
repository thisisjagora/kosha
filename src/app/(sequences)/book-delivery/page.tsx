"use client";
import { BookDeliverySequence } from "@/components/forms/sequences";
import { Column, Row } from "@/components/layout";
import { SequencesLayout } from "@/components/layout/sequences";
import { Quotations } from "@/components/quotations";
import { Quotes, QuotesAmount, QuotesContent, QuotesDistance, QuotesImage, QuotesRatings, QuotesTime, QuotesTitle } from "@/components/quotations/quotes";
import { Tabs, TabsContent, TabsCount, TabsList, TabsTrigger } from "@/components/tabs";
import { BookDeliveryMock } from "@/mocks";
import useShowQuotes from "@/stores/show-quotes.store";
import { DeliveryQuote } from "@/types/structs";
import { useState } from "react";

const Page = () => {
      const showQuote = useShowQuotes((state) => state.showQuote)
      const [activeTab, setActiveTab] = useState<string>("dlt");
      return (
            <>
                  {
                        !showQuote && (
                              <SequencesLayout>
                                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                                          <TabsList>
                                                <TabsTrigger className="flex gap-2" value="dlt">
                                                      <TabsCount count="1" isActive={activeTab === "dlt"} />
                                                      Date, Location & Time
                                                </TabsTrigger>
                                                <TabsTrigger className="flex gap-2" value="pld" >
                                                      <TabsCount count="2" isActive={activeTab === "pld"} />
                                                      Pickup Location Details
                                                </TabsTrigger>
                                                <TabsTrigger className="flex gap-2" value="itu">
                                                      <TabsCount count="3" isActive={activeTab === "itu"} />
                                                      Items to Pick up
                                                </TabsTrigger>
                                          </TabsList>
                                          <TabsContent value="dlt">
                                                <BookDeliverySequence.Step1 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                          <TabsContent value="pld">
                                                <BookDeliverySequence.Step2 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                          <TabsContent value="itu">
                                                <BookDeliverySequence.Step3 onChangeStep={(next) => setActiveTab(next ?? "")} />
                                          </TabsContent>
                                    </Tabs>
                              </SequencesLayout>
                        )
                  }
                  <Quotations<DeliveryQuote> 
                        list={BookDeliveryMock}
                        renderItem={({index, item}) => (
                              <Quotes key={item.name + index} className="min-w-[270px]">
                                    <QuotesImage src="" type="Book a delivery" />
                                    <QuotesContent>
                                          <Row className="items-start justify-between gap-6 flex-wrap">
                                                <Column>
                                                      <QuotesTitle title={item.name} />
                                                      <QuotesRatings rating={item.rating}/>
                                                </Column>
                                                <QuotesDistance distance={item.distance} />
                                          </Row>
                                          <Row className="justify-between items-center">
                                                <QuotesTime className="mt-[4px]" >{item.time}</QuotesTime>
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