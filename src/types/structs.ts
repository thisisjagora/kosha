import { bookMoveSequenceStep1Schema, bookMoveSequenceStep2Schema, bookMoveSequenceStep3Schema, bookMoveSequenceStep4Schema, hireLabourSequenceStep1Schema, hireLabourSequenceStep2Schema, hireLabourSequenceStep3Schema, bookDeliverySequenceStep1Schema, bookDeliverySequenceStep2Schema, bookDeliverySequenceStep3Schema } from "@/core/validators";
import { User } from "firebase/auth";
import { ReactNode } from "react";
import { z } from "zod";

export interface Services {
      id: string,
      label: string,
      description: string
}
export type BookMove = z.infer<typeof bookMoveSequenceStep1Schema> & z.infer<typeof bookMoveSequenceStep2Schema> & z.infer<typeof bookMoveSequenceStep3Schema> & z.infer<typeof bookMoveSequenceStep4Schema>;
export type HireLabour = z.infer<typeof hireLabourSequenceStep1Schema> & z.infer<typeof hireLabourSequenceStep2Schema> & z.infer<typeof hireLabourSequenceStep3Schema>
export type BookDelivery = z.infer<typeof bookDeliverySequenceStep1Schema> & z.infer<typeof bookDeliverySequenceStep2Schema> & z.infer<typeof bookDeliverySequenceStep3Schema>

interface Quote  {
      name: string,
      movers: number,
      rating: string,
      amount: string,
}

export interface MoveQuote extends Quote{
      vehicle: string
}
export interface LabourQuote extends Quote{
      activity: Array<string>
}
export interface DeliveryQuote extends Omit<Quote, "movers">{
      time: string,
      distance: string
}

export interface QuoteDetailsRate {
      icon: ReactNode, 
      label: string,
      rate: string
}

export interface IUser extends User {
      fullName: string
}