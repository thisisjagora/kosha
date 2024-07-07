import useShowQuotes from "@/stores/show-quotes.store";
import { Column, Row } from "../layout"
import { useEffect } from "react";
import { CircleAlert } from "lucide-react";
import { P } from "../atoms";
import Link from "next/link";
import { Routes } from "@/core/routing";

interface Props<T>{
	list: Array<T>;
	renderItem: (params: {
		index: number;
		item: T;
	}) => React.JSX.Element | null;
}
export const Quotations = <T,>(props: Props<T>) => {
      const {list, renderItem} = props
      return (
            <Row className="flex-col sm:flex-row flex-wrap gap-4 w-full h-full items-center sm:items-start justify-start">
                  {
                        list.length > 0 ? (
                              list.map((item, index) => renderItem({ index, item }))
                        ) : (
                              <Row className="w-full h-full items-center justify-center">
                                    <Column className="items-center justify-center max-w-max gap-4">
                                          <CircleAlert className="textPrimary"/>
                                          <P className="text-primary">We couldn't find any quotes for you at this time.</P>
                                          <Link href={Routes.root} className="border p-2 px-4 rounded-sm">
                                                <P className="text-grey-300 text-sm border-primary-foreground">Make a service request?</P>
                                          </Link>
                                    </Column>
                              </Row>
                        )
                  }
            </Row>
      )
}