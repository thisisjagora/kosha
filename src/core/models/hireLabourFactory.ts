import { BookMoveDto } from "@/types/dtos"
import { HireLabour } from "@/types/structs"
import { format } from "date-fns";

export const hireLabourFactory = (a:HireLabour): Partial<BookMoveDto> => {

      const addOns = [
            { name: "Major Appliances", quantity: parseInt(a.majorAppliances ?? "0") },
            { name: "Workout Equipment", quantity: parseInt(a.workOutEquipment ?? "0") },
            { name: "Pianos", quantity: parseInt(a.pianos ?? "0") },
            { name: "Hot Tubs", quantity: parseInt(a.hotTubs ?? "0") },
            { name: "Pool Tables", quantity: parseInt(a.poolTables ?? "0") },
            { name: "Number of Boxes", quantity: parseInt(a.numberOfBoxes ?? "0") }
          ];

      const filteredAddOns = addOns.filter(item => !isNaN(item.quantity) && item.quantity > 0);
      const formattedDate = format(new Date(a.date), 'M/d/yyyy');
      const formattedTime = format(new Date(`1970-01-01T${a.time}:00`), 'h:mm a');

      return {
            fromAddress: {
                  address: a.serviceLocation,
                  apartmentNumber: a.apartmentNumber ?? "",
                  buildingType: a.buildingType,
                  flightOfStairs: a.flightOfStairs ? parseInt(a.flightOfStairs) : 0,
                  googlePlaceId: a.googlePlaceId ?? "",
                  hasElevator: a.elevatorAccess,
                  id: ""
            },
            toAddress: {
                  address: "",
                  apartmentNumber: "",
                  buildingType: "",
                  flightOfStairs: 0,
                  googlePlaceId: "",
                  hasElevator: "",
                  id: "",
            },
            date: `${formattedDate} ${formattedTime}`,
            additionalStops: [],
            addOns: filteredAddOns,
            requestType: "LabourOnly"
      }
}