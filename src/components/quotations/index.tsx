import { Row } from "../layout"

interface Props<T>{
      showQuotes: boolean,
	list: Array<T>;
	renderItem: (params: {
		index: number;
		item: T;
	}) => React.JSX.Element | null;
}
export const Quotations = <T,>(props: Props<T>) => {
      const {showQuotes, list, renderItem} = props
      if(!showQuotes) return null;
      return (
            <Row className="flex-wrap gap-4 w-full">
                  {
                        list.map((item, index) => renderItem({ index, item }))
                  }
            </Row>
      )
}