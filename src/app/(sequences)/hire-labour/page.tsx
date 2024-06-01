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
                              <HireLabourSequence.Step1 onChangeStep={(next) => setActiveTab(next ?? "")} />
                        </TabsContent>
                        <TabsContent value="itm">
                              <HireLabourSequence.Step2 onChangeStep={(next) => setActiveTab(next ?? "")} />
                        </TabsContent>
                        <TabsContent value="generalInfo">
                              <HireLabourSequence.Step3 onChangeStep={(next) => setActiveTab(next ?? "")} />
                        </TabsContent>
                  </Tabs>
            </div>
      )
}

export default Page;