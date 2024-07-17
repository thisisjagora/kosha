"use client";
import {
  AdditionalStops,
  Alarm,
  Appliances,
  FlightOfStairs,
  Piano,
  TruckFrontGrey,
} from "@/components/Icons";
import { P } from "@/components/atoms";
import { Column, Row } from "@/components/layout";
import {
  QuoteDetails,
  QuoteDetailsCharge,
  QuoteDetailsMap,
  QuoteDetailsRates,
  QuoteDetailsVehicle,
  QuoteDetailsWorkers,
  QuoteDetailsEditRequest,
} from "@/components/quotations/quote-details";
import { useQuoteDetailsData } from "@/contexts/QuoteDetails.context";
import { Routes } from "@/core/routing";
import { formatCurrency } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import useBookingStore from "@/stores/booking.store";
import type { Quote } from "@/types/structs";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const selectedBooking = useBookingStore.use.selectedBooking();
  const finishing = searchParams.get("action") === "finish",
    updating = searchParams.get("action") === "update";

  console.log("finishing: ", finishing);
  console.log("updating: ", updating);

  const iconSizes = {
    width: 21,
    height: 21,
  };

  const { quoteDetailsData } = useQuoteDetailsData();
  const {
    companyName,
    numberOfReviews,
    movers,
    truckFee,
    flightOfStairsFee,
    pianosFee,
    minimumHours,
    hourlyRate,
    stopOverFee,
    majorAppliancesFee,
    hotTubsFee,
    poolTablesFee,
    workoutEquipmentsFee,
    minimumAmount,
    movingTruck,
  } = finishing
    ? (selectedBooking?.quote as Quote) ?? {}
    : quoteDetailsData || {};
  if (companyName === "") {
    return (
      <Row className="w-full h-full items-center justify-center">
        <Column className="items-center justify-center max-w-max gap-4">
          <CircleAlert className="textPrimary" />
          <P className="text-primary text-base">No quote detail available!</P>
          <Link
            href={
              finishing ? `${Routes.sequence.bookMove}` : Routes.bookMoveQuotes
            }
            className="border p-2 px-4 rounded-sm"
          >
            <P className="text-grey-300 text-sm border-primary-foreground">
              {finishing
                ? "Update your booking"
                : " See available quotes for previous request "}
            </P>
          </Link>
        </Column>
      </Row>
    );
  }

  return (
    <QuoteDetails className="flex-col sm:flex-row">
      <Column className="gap-4">
        <Row className="gap-4 flex-col lg:flex-row">
          <QuoteDetailsMap
            data={{
              location: {
                lat: "",
                long: "",
              },
              name: companyName,
              charge: hourlyRate,
              reviews: numberOfReviews,
              movesCompleted: "nil",
            }}
          />
          <QuoteDetailsWorkers movers={movers} disabled={finishing} />
        </Row>
        <QuoteDetailsRates
          rates={[
            {
              icon: <TruckFrontGrey {...iconSizes} />,
              label: "Truck Fee",
              rate: truckFee,
            },
            {
              icon: <Appliances {...iconSizes} />,
              label: "Appliances",
              rate: majorAppliancesFee,
            },
            {
              icon: <FlightOfStairs {...iconSizes} />,
              label: "Flight of Stairs",
              rate: flightOfStairsFee,
            },
            {
              icon: <Piano {...iconSizes} />,
              label: "Piano",
              rate: pianosFee,
            },
            {
              icon: <AdditionalStops {...iconSizes} />,
              label: "Additional Stops",
              rate: stopOverFee,
            },
            {
              icon: <Appliances {...iconSizes} />,
              label: "Hot Tub",
              rate: hotTubsFee,
            },
            {
              icon: <Appliances {...iconSizes} />,
              label: "Pool Table",
              rate: poolTablesFee,
            },
            {
              icon: <Appliances {...iconSizes} />,
              label: "Workout Equipments",
              rate: workoutEquipmentsFee,
            },
            {
              icon: <Alarm {...iconSizes} />,
              label: "Minimum Hours",
              count: minimumHours,
              rate: hourlyRate * minimumHours,
            },
          ]}
        />
      </Column>
      <Column className="gap-4 max-w-[400px]">
        <QuoteDetailsVehicle
          truckType={movingTruck}
          disabled={finishing || selectedBooking?.status === "Cancelled"}
        />
        {((!updating && !finishing) ||
          selectedBooking?.status !== "Cancelled") && (
          <>
            <QuoteDetailsCharge
              amount={formatCurrency(minimumAmount)}
              hourlyRate={formatCurrency(hourlyRate)}
              finishing={finishing}
              updating={updating}
            />
            {finishing && <QuoteDetailsEditRequest type="RegularMove" />}
          </>
        )}
      </Column>
    </QuoteDetails>
  );
};

export default Page;
