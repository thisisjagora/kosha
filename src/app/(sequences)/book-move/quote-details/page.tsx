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
import useBookMoveStore from "@/stores/book-move.store";
import type { Quote } from "@/types/structs";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const formData = useBookMoveStore((store) => store.formData);
  const selectedBooking = useBookingStore.use.selectedBooking();
  const finishing = searchParams.get("action") === "finish",
    updating = searchParams.get("action") === "update";

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

  // const amount = useMemo(() => {
  //   const majorAppliancesAmount =
  //     (+formData.majorAppliances! || 0) * majorAppliancesFee;
  //   const workoutEquipmentsAmount =
  //     (+formData.workOutEquipment! || 0) * workoutEquipmentsFee;
  //   const pianosAmount = (+formData.pianos! || 0) * pianosFee;
  //   const hotTubsAmount = (+formData.hotTubs! || 0) * hotTubsFee;
  //   const poolTablesAmount = (+formData.poolTables! || 0) * poolTablesFee;
  //   const stopsAmount = formData.stops.length * stopOverFee;
  //   const flightOfStairsAmount =
  //     ((+formData.PUDPickUpLocation.flightOfStairs! || 0) +
  //       (+formData.PUDFinalDestination.flightOfStairs! || 0) +
  //       (formData.PUDStops?.reduce(
  //         (acc, curr) => acc + (+curr.flightOfStairs! || 0),
  //         0
  //       ) ?? 0) ?? 0) * flightOfStairsFee;
  //   return (
  //     minimumAmount +
  //     majorAppliancesAmount +
  //     workoutEquipmentsAmount +
  //     pianosAmount +
  //     hotTubsAmount +
  //     poolTablesAmount +
  //     stopsAmount +
  //     flightOfStairsAmount
  //   );
  // }, [
  //   minimumAmount,
  //   formData.majorAppliances,
  //   majorAppliancesFee,
  //   formData.workOutEquipment,
  //   workoutEquipmentsFee,
  //   formData.pianos,
  //   pianosFee,
  //   formData.hotTubs,
  //   hotTubsFee,
  //   formData.poolTables,
  //   poolTablesFee,
  //   formData.stops.length,
  //   stopOverFee,
  //   formData.PUDPickUpLocation.flightOfStairs,
  //   formData.PUDFinalDestination.flightOfStairs,
  //   formData.PUDStops,
  //   flightOfStairsFee,
  // ]);

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
          <QuoteDetailsWorkers movers={movers} disabled={finishing} updating={updating} />
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
              ...(+(formData.majorAppliances ?? 0)
                ? { count: +(formData.majorAppliances ?? 0) }
                : {}),
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
              ...(+(formData.pianos ?? 0)
                ? { count: +(formData.pianos ?? 0) }
                : {}),
            },
            {
              icon: <AdditionalStops {...iconSizes} />,
              label: "Additional Stops",
              rate: stopOverFee,
              ...(formData.PUDStops?.length
                ? { count: formData.PUDStops.length }
                : {}),
            },
            {
              icon: <Appliances {...iconSizes} />,
              label: "Hot Tub",
              rate: hotTubsFee,
              ...(+(formData.hotTubs ?? 0)
                ? { count: +(formData.hotTubs ?? 0) }
                : {}),
            },
            {
              icon: <Appliances {...iconSizes} />,
              label: "Pool Table",
              rate: poolTablesFee,
              ...(+(formData.poolTables ?? 0)
                ? { count: +(formData.poolTables ?? 0) }
                : {}),
            },
            {
              icon: <Appliances {...iconSizes} />,
              label: "Workout Equipments",
              rate: workoutEquipmentsFee,
              ...(+(formData.workOutEquipment ?? 0)
                ? { count: +(formData.workOutEquipment ?? 0) }
                : {}),
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
          updating={updating}
        />
        {((!updating && !finishing) ||
          selectedBooking?.status !== "Cancelled") && (
          <>
            <QuoteDetailsCharge
              amount={minimumAmount}
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
