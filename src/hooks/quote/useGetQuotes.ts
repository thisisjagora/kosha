import { toast } from "@/components/toast/use-toast";
import { ErrorMessage, StorageKeys } from "@/constants/enums";
import { getQuotes as getQuotesData } from "@/core/api/quote";
import useBookMoveStore from "@/stores/book-move.store";
import useShowQuotes from "@/stores/show-quotes.store";
import { BookMoveDto } from "@/types/dtos";
import { Quote } from "@/types/structs";
import { useMutation } from "@tanstack/react-query";

export const useGetQuotes = () => {
	const { formData, reset } = useBookMoveStore((state) => state);
	const setQuotesResult = useShowQuotes((state) => state.setQuotesResult);
    
	const methods = useMutation<any, any, BookMoveDto>({
		mutationFn: (props) => getQuotesData(props)
	    });
    

	const _useGetQuotes = (payload : BookMoveDto ) =>
		methods
			.mutateAsync(payload)
			.then((res) => {
				localStorage.setItem(StorageKeys.FORM_DATA, JSON.stringify(formData))
                        setQuotesResult(res.result as Array<Quote>)
				reset()
			})
			.catch((err) => {
                        toast({
                              title:"Oops!",
                              description: ErrorMessage.UNEXPECTED_ERROR, //TODO:add a proper function to handle error
                              variant:"destructive"
                        })
			});

	return {
		...methods,
		getQuotes: _useGetQuotes
	};
}