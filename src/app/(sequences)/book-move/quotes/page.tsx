"use client";
import { Column, Row } from "@/components/layout";
import { Quotations } from "@/components/quotations"
import { Quotes, QuotesAmount, QuotesContent, QuotesImage, QuotesMovers, QuotesMoversDoodles, QuotesRatings, QuotesTitle, QuotesVehicle } from "@/components/quotations/quotes";
import { useQuoteDetailsData } from "@/contexts/QuoteDetails.context";
import { Routes } from "@/core/routing";
import useShowQuotes from "@/stores/show-quotes.store";
import { Quote } from "@/types/structs"
import { useRouter } from "next/navigation";

const Page = () => {
      const router = useRouter();
      const { setQuoteDetailsData } = useQuoteDetailsData();
      const { quotesResult } = useShowQuotes((state) => state)
      return (
            <Quotations<Quote> 
                  list={quotesResult}
                  renderItem={({index, item}) => (
                        <Quotes
                              onClick={() => {
                                    setQuoteDetailsData(item)
                                    router.push(Routes.bookMoveQuoteDetails)
                              }} 
                              key={item.companyName + index}
                        >
                              <QuotesImage src="" type="Book a move" />
                              <QuotesContent>
                                    <Row className="items-start justify-between gap-6 flex-wrap">
                                          <Column>
                                          <QuotesTitle title={item.companyName} />
                                          <QuotesMovers>{item.movers} Movers</QuotesMovers>
                                          </Column>
                                          <QuotesMoversDoodles length={item.movers}/>
                                    </Row>
                                    <Row className="justify-between items-center">
                                          <Column className="gap-1">
                                                <QuotesVehicle>{item.movingTruck}</QuotesVehicle>
                                                <QuotesRatings rating={item.averageRating}/>
                                          </Column>
                                          <QuotesAmount amount={item.minimumAmount}/>
                                    </Row>
                              </QuotesContent>
                        </Quotes>
                  )}
            />
      )
}

export default Page;