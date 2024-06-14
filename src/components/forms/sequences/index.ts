import { Services } from "@/types/structs";

export * from "./bookDelivery";
export * from "./bookMove";
export * from "./hireLabour";

export interface SequenceStepsProps {
      onChangeStep: (next? : string) => void;
}

export const SERVICES: Array<Services> = [
      {
            id: "reassembly",
            label: "Reassembly",
            description: "Reassembling of any equipment, furniture, new or old when at the final destination of the move" 
      },
      {
            id: "disassembly",
            label: "Disassembly",
            description: "Disassembling of any equipment, furniture, new or old when at the at pick up locations" 
      },
      {
            id: "furniture wrapping",
            label: "Furniture Wrapping",
            description: "Wrapping furniture with protective wraps like nylon, bubble, tarp etc" 
      },
      {
            id: "dollies",
            label: "Dollies",
            description: "To help you transport large heavy-based items" 
      },
      {
            id: "moving pads",
            label: "Moving Pads",
            description: "Heavy duty moving blankets to prevent scratches when moving furniture" 
      },
      {
            id: "straps",
            label: "Straps",
            description: "Industrial grade straps to secure all equipment, boxes etc" 
      },
      {
            id: "floor runners",
            label: "Floor Runners",
            description: "To help you transport large heavy-based items" 
      },
      {
            id: "tape",
            label: "Tape",
            description: "Industrial grade straps to secure all equipment, boxes etc" 
      },
      {
            id: "move garage items",
            label: "Move Garage Items",
            description: "Move Garage Items" 
      },
      {
            id: "move patio items",
            label: "Move Patio Items",
            description: "Move Patio Items" 
      }
]