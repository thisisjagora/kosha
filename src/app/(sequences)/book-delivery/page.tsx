"use client";
import { BookDeliverySequence } from "@/components/forms/sequences";
import { Tabs, TabsContent, TabsCount, TabsList, TabsTrigger } from "@/components/tabs";
import { useState } from "react";

const Page = () => {
      const [activeTab, setActiveTab] = useState<string>("dlt");
      return (
            <div>
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
            </div>
      )
}

export default Page;