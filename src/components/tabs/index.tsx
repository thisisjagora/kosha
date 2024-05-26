"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { P } from "../atoms"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-between rounded-4xl bg-white-100 text-muted-foreground w-full shadow-sm",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "h-full inline-flex items-center justify-center whitespace-nowrap rounded-4xl px-5 py-3 text-grey-400 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=active]:bg-orange-100 data-[state=active]:text-white-100 data-[state=active]:shadow-lg",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName


interface TabsCountProps {
  count: string;
  isActive: boolean;
}

const TabsCount: React.FC<TabsCountProps> = ({count, isActive}) => {
  return (
    <div className={cn("flex items-center justify-center rounded-full w-[30px] h-[30px] bg-grey-500 shadow-sm", {
      "bg-white-100": isActive
    })}>
      <P className={cn("text-grey-200", {
        "text-orange-100": isActive
      })}>{count}</P>
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsCount, TabsContent }
