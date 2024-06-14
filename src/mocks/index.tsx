import { AdditionalStops, Alarm, Appliances, FlightOfStairs, Piano, TruckFrontGrey } from "@/components/Icons";
import { DeliveryQuote, LabourQuote, MoveQuote, QuoteDetailsRate } from "@/types/structs";

export const BookMoveMock:Array<MoveQuote> = [
      {
            name: "Pete and Sons",
            movers: 2,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.6",
            amount: "80"
      },
      {
            name: "Tiyendi Movers",
            movers: 3,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.8",
            amount: "80"
      },
      {
            name: "Pete and Sons",
            movers: 2,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.6",
            amount: "80"
      },
      {
            name: "Tiyendi Movers",
            movers: 3,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.8",
            amount: "80"
      },
      {
            name: "Pete and Sons",
            movers: 2,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.6",
            amount: "80"
      },
      {
            name: "Tiyendi Movers",
            movers: 3,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.8",
            amount: "80"
      },
      {
            name: "Pete and Sons",
            movers: 2,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.6",
            amount: "80"
      },
      {
            name: "Tiyendi Movers",
            movers: 3,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.8",
            amount: "80"
      },
      {
            name: "Pete and Sons",
            movers: 2,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.6",
            amount: "80"
      },
      {
            name: "Tiyendi Movers",
            movers: 3,
            vehicle: "Pickup, Van, 16ft Truck...",
            rating: "4.8",
            amount: "80"
      },
]

export const HireLabourMock:Array<LabourQuote> = [
      {
            name: "Faith Delivery",
            movers: 3,
            activity: ["Dismantling", "Assembly"],
            rating: "4.2",
            amount: "110"
      },
      {
            name: "New Harvest Inc",
            movers: 4,
            activity: ["Dismantling", "Assembly"],
            rating: "4.8",
            amount: "240"
      },
      {
            name: "Declan Delivery",
            movers: 2,
            activity: ["Dismantling", "Assembly"],
            rating: "4.5",
            amount: "1299"
      },
      {
            name: "Faith Delivery",
            movers: 3,
            activity: ["Dismantling", "Assembly"],
            rating: "4.2",
            amount: "110"
      },
      {
            name: "New Harvest Inc",
            movers: 4,
            activity: ["Dismantling", "Assembly"],
            rating: "4.8",
            amount: "240"
      },
      {
            name: "Declan Delivery",
            movers: 2,
            activity: ["Dismantling", "Assembly"],
            rating: "4.5",
            amount: "1299"
      },
      {
            name: "Faith Delivery",
            movers: 3,
            activity: ["Dismantling", "Assembly"],
            rating: "4.2",
            amount: "110"
      },
      {
            name: "New Harvest Inc",
            movers: 4,
            activity: ["Dismantling", "Assembly"],
            rating: "4.8",
            amount: "240"
      },
      {
            name: "Declan Delivery",
            movers: 2,
            activity: ["Dismantling", "Assembly"],
            rating: "4.5",
            amount: "1299"
      }
]

export const BookDeliveryMock:Array<DeliveryQuote> = [
      {
            name: "Tiyende Movers",
            rating: "4.6",
            time: "12:00pm-4:00pm",
            amount: "218",
            distance:"4.7"
      },
      {
            name: "NextDay Delivery",
            rating: "4.8",
            time: "12:00pm-4:00pm",
            amount: "114",
            distance:"4.2"
      },
      {
            name: "Tiyende Movers",
            rating: "4.6",
            time: "12:00pm-4:00pm",
            amount: "218",
            distance:"4.7"
      },
      {
            name: "NextDay Delivery",
            rating: "4.8",
            time: "12:00pm-4:00pm",
            amount: "114",
            distance:"4.2"
      },
      {
            name: "Tiyende Movers",
            rating: "4.6",
            time: "12:00pm-4:00pm",
            amount: "218",
            distance:"4.7"
      },
      {
            name: "NextDay Delivery",
            rating: "4.8",
            time: "12:00pm-4:00pm",
            amount: "114",
            distance:"4.2"
      },
      {
            name: "Tiyende Movers",
            rating: "4.6",
            time: "12:00pm-4:00pm",
            amount: "218",
            distance:"4.7"
      },
      {
            name: "NextDay Delivery",
            rating: "4.8",
            time: "12:00pm-4:00pm",
            amount: "114",
            distance:"4.2"
      }
]

const iconSizes = {
      width: 21,
      height: 21
}
export const QuoteDetailsRatesMock:Array<QuoteDetailsRate> = [
      {
            icon: <TruckFrontGrey {...iconSizes} />,
            label: "Truck Fee",
            rate: "49"
      },
      {
            icon: <Appliances {...iconSizes} />,
            label: "Appliances",
            rate: "279.95"
      },
      {
            icon: <FlightOfStairs {...iconSizes} />,
            label: "Flight of Stairs",
            rate: "95"
      },
      {
            icon: <Piano {...iconSizes} />,
            label: "Piano",
            rate: "79.50"
      },
      {
            icon: <AdditionalStops {...iconSizes} />,
            label: "Additional Stops",
            rate: "27.50"
      },
      {
            icon: <Alarm {...iconSizes} />,
            label: "Minimum Hours",
            rate: "356"
      }
]