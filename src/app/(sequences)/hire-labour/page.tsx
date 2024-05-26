"use client";
import { HireLabourSequence } from "@/components/forms/sequences";
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
                              <TabsTrigger className="flex gap-2" value="itm" >
                                    <TabsCount count="2" isActive={activeTab === "itm"} />
                                    Items to Move
                              </TabsTrigger>
                              <TabsTrigger className="flex gap-2" value="generalInfo">
                                    <TabsCount count="3" isActive={activeTab === "generalInfo"} />
                                    General Info
                              </TabsTrigger>
                        </TabsList>
                        <TabsContent value="dlt">
                              <HireLabourSequence.step1 />
                        </TabsContent>
                        <TabsContent value="itm">
                              <HireLabourSequence.step2 />
                        </TabsContent>
                        <TabsContent value="generalInfo">
                              <HireLabourSequence.step3 />
                        </TabsContent>
                  </Tabs>
            </div>
      )
}

export default Page;