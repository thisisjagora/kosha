import { bookMoveSequenceStep1Schema, bookMoveSequenceStep2Schema } from "@/core/validators";
import { z } from "zod";

export type BookMove = z.infer<typeof bookMoveSequenceStep1Schema> & z.infer<typeof bookMoveSequenceStep2Schema>;