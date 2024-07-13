import { mergeArrays } from "@/lib/utils";
import { BookMoveDto } from "@/types/dtos";
import { BookMove } from "@/types/structs";
import { format } from "date-fns";

const parseFlightOfStairs = (stop: any) => ({
      ...stop,
      flightOfStairs: typeof stop.flightOfStairs === "string" ? parseInt(stop.flightOfStairs) || 0 
                      : typeof stop.flightOfStairs === "number" ? stop.flightOfStairs
                      : 0,
    });

/**
 * Creates a BookMoveDto from a given BookMove.
 * 
 * @param a - The BookMove object to convert.
 * @returns The corresponding BookMoveDto.
 * 
 * requestType is defaulted
 */
export const bookMoveFactory = (a:BookMove): BookMoveDto => {
    //TODO: Handle driverId

    const addOns = [
      { name: "Major Appliances", quantity: parseInt(a.majorAppliances ?? "0") },
      { name: "Workout Equipment", quantity: parseInt(a.workOutEquipment ?? "0") },
      { name: "Pianos", quantity: parseInt(a.pianos ?? "0") },
      { name: "Hot Tubs", quantity: parseInt(a.hotTubs ?? "0") },
      { name: "Pool Tables", quantity: parseInt(a.poolTables ?? "0") },
      { name: "Number of Boxes", quantity: parseInt(a.numberOfBoxes ?? "0") }
    ];
    
    const filteredAddOns = addOns.filter(item => !isNaN(item.quantity) && item.quantity > 0);

    const formattedDate = format(new Date(a.moveDate), 'M/d/yyyy');
    const formattedTime = format(new Date(`1970-01-01T${a.time}:00`), 'h:mm a');

      return {
            fromAddress: {
                  address: a.pickUpLocation.location,
                  apartmentNumber: a.pickUpLocation.apartmentNumber ?? "",
                  buildingType: a.PUDPickUpLocation.buildingType,
                  flightOfStairs: a.PUDPickUpLocation.flightOfStairs ? parseInt(a.PUDPickUpLocation.flightOfStairs) : 0,
                  googlePlaceId: a.pickUpLocation.googlePlaceId ?? "",
                  hasElevator: a.PUDPickUpLocation.elevatorAccess,
                  id: ""
            },
            toAddress: {
                  address: a.finalDestination.location,
                  apartmentNumber: a.finalDestination.apartmentNumber ?? "",
                  buildingType: a.PUDFinalDestination.buildingType,
                  flightOfStairs: a.PUDFinalDestination.flightOfStairs ? parseInt(a.PUDFinalDestination.flightOfStairs) : 0,
                  googlePlaceId: a.finalDestination.googlePlaceId ?? "",
                  hasElevator: a.PUDFinalDestination.elevatorAccess,
                  id: "",
            },
            date: `${formattedDate} ${formattedTime}`,
            additionalStops: mergeArrays(a.stops, a.PUDStops).map(parseFlightOfStairs),
            addOns: filteredAddOns,
            requestType: "RegularMove"
      }
}