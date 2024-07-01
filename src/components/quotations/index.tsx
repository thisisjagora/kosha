import useShowQuotes from "@/stores/show-quotes.store";
import { Row } from "../layout"
import { useEffect } from "react";

interface Props<T>{
	list: Array<T>;
	renderItem: (params: {
		index: number;
		item: T;
	}) => React.JSX.Element | null;
}
export const Quotations = <T,>(props: Props<T>) => {
      const {list, renderItem} = props
      const { showQuote, setShowQuote } = useShowQuotes((state) => state)
      useEffect(() => {
            return () => {
              setShowQuote(false);
            };
          }, [setShowQuote]);
      if(!showQuote) return null;
      return (
            <Row className="flex-wrap gap-4 w-full justify-center sm:justify-start">
                  {
                        list.map((item, index) => renderItem({ index, item }))
                  }
            </Row>
      )
}