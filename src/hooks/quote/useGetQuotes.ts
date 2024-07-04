import { getQuotes as getQuotesData } from "@/core/api/quote";
import useShowQuotes from "@/stores/show-quotes.store";
import { BookMoveDto } from "@/types/dtos";
import { useMutation } from "@tanstack/react-query";

export const useGetQuotes = () => {
      const setQuotesResult = useShowQuotes((state) => state.setQuotesResult)
	const methods = useMutation<any, any, BookMoveDto>({
		mutationFn: (props) => getQuotesData(props)
	});

	const _useGetQuotes = (payload : BookMoveDto ) =>
		methods
			.mutateAsync(payload)
			.then((val) => {
                        console.log(val)
                        // setQuotesResult(val)
			})
			.catch((err) => {
                        console.log(err.response)
			});

	return {
		...methods,
		getQuotes: _useGetQuotes
	};
}