import { mergeArrays } from "@/lib/utils";
import { BookMoveDto } from "@/types/dtos";
import { BookMove } from "@/types/structs";

const parseFlightOfStairs = (stop: any) => ({
      ...stop,
      flightOfStairs: stop.flightOfStairs ? parseInt(stop.flightOfStairs) : 0,
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
    //TODO: Handle googlePlaceId, id, companyId, buildingId

    const addOns = [
      { name: "Major Appliances", quantity: parseInt(a.majorAppliances ?? "0") },
      { name: "Workout Equipment", quantity: parseInt(a.workOutEquipment ?? "0") },
      { name: "Pianos", quantity: parseInt(a.pianos ?? "0") },
      { name: "Hot Tubs", quantity: parseInt(a.hotTubs ?? "0") },
      { name: "Pool Tables", quantity: parseInt(a.poolTables ?? "0") },
      { name: "Number of Boxes", quantity: parseInt(a.numberOfBoxes ?? "0") }
    ];
    
    const filteredAddOns = addOns.filter(item => !isNaN(item.quantity) && item.quantity > 0);

      return {
            fromAddress: {
                  address: a.pickUpLocation.location,
                  apartmentNumber: a.pickUpLocation.apartmentNumber ?? "",
                  buildingType: a.PUDPickUpLocation.buildingType,
                  flightOfStairs: a.PUDPickUpLocation.flightOfStairs ? parseInt(a.PUDPickUpLocation.flightOfStairs) : 0,
                  googlePlaceId: a.PUDPickUpLocation.buildingType,
                  hasElevator: a.PUDPickUpLocation.elevatorAccess,
                  id: a.PUDPickUpLocation.buildingType
            },
            toAddress: {
                  address: a.finalDestination.location,
                  apartmentNumber: a.finalDestination.apartmentNumber ?? "",
                  buildingType: a.PUDFinalDestination.buildingType,
                  flightOfStairs: a.PUDFinalDestination.flightOfStairs ? parseInt(a.PUDFinalDestination.flightOfStairs) : 0,
                  googlePlaceId: a.PUDFinalDestination.buildingType,
                  hasElevator: a.PUDFinalDestination.elevatorAccess,
                  id: a.PUDFinalDestination.buildingType,
            },
            date: `${a.moveDate} ${a.time}`,
            additionalStops: mergeArrays(a.stops, a.PUDStops).map(parseFlightOfStairs),
            addOns: filteredAddOns,
            companyId: "",
            bookingId: "",
            requestType: "RegularMove"
      }
}