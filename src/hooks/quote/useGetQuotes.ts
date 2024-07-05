import { toast } from "@/components/toast/use-toast";
import { getQuotes as getQuotesData } from "@/core/api/quote";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import useBookMoveStore from "@/stores/book-move.store";
import useShowQuotes from "@/stores/show-quotes.store";
import { BookMoveDto } from "@/types/dtos";
import { Quote } from "@/types/structs";
import { useMutation } from "@tanstack/react-query";

export const useGetQuotes = () => {
	const setQuotesResult = useShowQuotes((state) => state.setQuotesResult);
	const { reset } = useBookMoveStore((state) => state);
    
	const methods = useMutation<any, any, BookMoveDto>({
		mutationFn: (props) => getQuotesData(props)
	    });
    

	const _useGetQuotes = (payload : BookMoveDto ) =>
		methods
			.mutateAsync(payload)
			.then((res) => {
                        setQuotesResult(res.result as Array<Quote>)
				reset()
			})
			.catch((err) => {
                        toast({
                              title:"Oops!",
                              description: getErrorMessage(err.response.message),
                              variant:"destructive"
                        })
			});

	return {
		...methods,
		getQuotes: _useGetQuotes
	};
}