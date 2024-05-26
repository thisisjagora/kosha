"use client";
import { Tabs, TabsContent, TabsCount, TabsList, TabsTrigger } from "@/components/tabs";
import { useState } from "react";

const Page = () => {
      const [activeTab, setActiveTab] = useState<string>("dateAndTime");
      return (
            <div>
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
                              <p>Date and Time</p>
                        </TabsContent>
                        <TabsContent value="propertyDetail">
                              <p>Property Detail</p>
                        </TabsContent>
                        <TabsContent value="generalInfo">
                              <p>General Info</p>
                        </TabsContent>
                        <TabsContent value="serviceRequirement">
                              <p>Service Requirement</p>
                        </TabsContent>
                  </Tabs>
            </div>
      )
}

export default Page;