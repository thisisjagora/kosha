import { bookMoveSequenceStep1Schema, bookMoveSequenceStep2Schema, bookMoveSequenceStep3Schema, bookMoveSequenceStep4Schema, hireLabourSequenceStep1Schema, hireLabourSequenceStep2Schema, hireLabourSequenceStep3Schema } from "@/core/validators";
import { z } from "zod";

export type BookMove = z.infer<typeof bookMoveSequenceStep1Schema> & z.infer<typeof bookMoveSequenceStep2Schema> & z.infer<typeof bookMoveSequenceStep3Schema> & z.infer<typeof bookMoveSequenceStep4Schema>;
export type HireLabour = z.infer<typeof hireLabourSequenceStep1Schema> & z.infer<typeof hireLabourSequenceStep2Schema> & z.infer<typeof hireLabourSequenceStep3Schema>