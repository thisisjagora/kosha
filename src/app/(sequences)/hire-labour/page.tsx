"use client";
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
                              <p>Date, Location & Time</p>
                        </TabsContent>
                        <TabsContent value="itm">
                              <p>Items to move</p>
                        </TabsContent>
                        <TabsContent value="generalInfo">
                              <p>General Info</p>
                        </TabsContent>
                  </Tabs>
            </div>
      )
}

export default Page;