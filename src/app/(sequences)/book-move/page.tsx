"use client";
import { BookMoveSequence } from "@/components/forms/sequences";
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
                              <BookMoveSequence.Step1 onChangeStep={(next) => setActiveTab(next ?? "")} />
                        </TabsContent>
                        <TabsContent value="propertyDetail">
                              <BookMoveSequence.Step2 onChangeStep={(next) => setActiveTab(next ?? "")} />
                        </TabsContent>
                        <TabsContent value="generalInfo">
                              <BookMoveSequence.Step3 onChangeStep={(next) => setActiveTab(next ?? "")} />
                        </TabsContent>
                        <TabsContent value="serviceRequirement">
                              <BookMoveSequence.Step4 onChangeStep={() => null} />
                        </TabsContent>
                  </Tabs>
            </div>
      )
}

export default Page;