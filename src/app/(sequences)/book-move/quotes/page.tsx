"use client";
import { Column, Row } from "@/components/layout";
import { Quotations } from "@/components/quotations";
import {
  Quotes,
  QuotesAmount,
  QuotesContent,
  QuotesImage,
  QuotesMovers,
  QuotesMoversDoodles,
  QuotesRatings,
  QuotesTitle,
  QuotesVehicle,
} from "@/components/quotations/quotes";
import { useQuoteDetailsData } from "@/contexts/QuoteDetails.context";
import { Routes } from "@/core/routing";
import useShowQuotes from "@/stores/show-quotes.store";
import { Quote } from "@/types/structs";
import { useRouter } from "next/navigation";
// import { Loader } from "lucide-react";
// import { useUpdateQuote } from "@/hooks/quote/useUpdateQuote";
import { CircleAlert } from "lucide-react";
import useBookingStore from "@/stores/booking.store";
import { P } from "@/components/atoms";
import Link from "next/link";

const Page = ({
  searchParams,
}: {
  searchParams: { action?: "update" | "finish" | string };
}) => {
  // const updated
  const selectedBooking = useBookingStore.use.selectedBooking();
  // const updateSelectedBookingQuote =
  //   useBookingStore.use.updateSelectedBookingQuote();
  const router = useRouter();
  const { setQuoteDetailsData } = useQuoteDetailsData();
  // const { isPending, mutate: updateQuote } = useUpdateQuote({
  //   onSuccess: (data) => {
  //     setQuoteDetailsData(data);
  //     updateSelectedBookingQuote(data);
  //     router.push(`${Routes.bookMoveQuoteDetails}?action=finish`);
  //   },
  // });
  const { quotesResult } = useShowQuotes((state) => state);
  const updating = searchParams.action === "update";
  if (!selectedBooking && updating) {
    return (
      <Row className="w-full h-full items-center justify-center">
        <Column className="items-center justify-center max-w-max gap-4">
          <CircleAlert className="textPrimary" />
          <P className="text-primary text-base">No booking selected</P>
          <Link href={Routes.bookings} className="border p-2 px-4 rounded-sm">
            <P className="text-grey-300 text-sm border-primary-foreground">
              See your bookings
            </P>
          </Link>
        </Column>
      </Row>
    );
  }
  return (
    <>
      {/*isPending && (
        <div className="bg-[#C29C80] text-white-500  px-4 py-4 rounded-xl fixed left-1/2 top-1/2 -translate-x-1/2 z-50 flex gap-2 flex-wrap">
          <Loader className="animate-spin text-white-500" />
          <p>Updating quote...</p>
        </div>
      )*/}
      <Quotations<Quote>
        list={quotesResult}
        renderItem={({ index, item }) => (
          <Quotes
            onClick={() => {
              // if (updating) {
              //   if (isPending || !selectedBooking?.bookingId) return;
              //   updateQuote({
              //     bookingId: selectedBooking.bookingId,
              //     quote: item,
              //   });
              // } else {
              //   setQuoteDetailsData(item);
              //   router.push(Routes.bookMoveQuoteDetails);
              // }
              setQuoteDetailsData(item);
              router.push(
                `${Routes.bookMoveQuoteDetails}${
                  updating ? "?action=update" : ""
                }`
              );
            }}
            key={item.companyName + index}
          >
            <QuotesImage src="" type="RegularMove" />
            <QuotesContent>
              <Row className="items-start justify-between gap-6 flex-wrap">
                <Column>
                  <QuotesTitle title={item.companyName} />
                  <QuotesMovers>{item.movers} Movers</QuotesMovers>
                </Column>
                <QuotesMoversDoodles length={item.movers} />
              </Row>
              <Row className="justify-between items-center">
                <Column className="gap-1">
                  <QuotesVehicle>{item.movingTruck}</QuotesVehicle>
                  <QuotesRatings rating={item.averageRating} />
                </Column>
                <QuotesAmount amount={item.minimumAmount} />
              </Row>
            </QuotesContent>
          </Quotes>
        )}
      />
    </>
  );
};

export default Page;
