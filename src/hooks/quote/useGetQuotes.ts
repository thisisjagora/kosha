import { toast } from "@/components/toast/use-toast";
import { ErrorMessage, StorageKeys } from "@/constants/enums";
import { getQuotes as getQuotesData } from "@/core/api/quote";
import bookMoveStore from "@/stores/book-move.store";
import useShowQuotes from "@/stores/show-quotes.store";
import { BookMoveDto } from "@/types/dtos";
import { Quote } from "@/types/structs";
import { useMutation } from "@tanstack/react-query";
import { useValidRoute } from "../useValidRoute";
import { Routes } from "@/core/routing";
import hireLabourStore from "@/stores/hire-labour.store";

export const useGetQuotes = () => {
	const { isValidRoute: isHireLabourRoute } = useValidRoute(Routes.sequence.hireLabour)
	// const { formData, reset } = useBookMoveStore((state) => state);
	const setQuotesResult = useShowQuotes((state) => state.setQuotesResult);
	const methods = useMutation<any, any, Partial<BookMoveDto>>({
		mutationFn: (props) => getQuotesData(props)
	    });

	const _useGetQuotes = (payload : Partial<BookMoveDto> ) =>
		methods
			.mutateAsync(payload)
			.then((res) => {
				const { formData, reset } = bookMoveStore((state) => state);
				const {formData: hireLabourFormData, reset: resetHireLabour } = hireLabourStore((state) => state);
				if(isHireLabourRoute){
					localStorage.setItem(StorageKeys.FORM_DATA, JSON.stringify(hireLabourFormData))
					setQuotesResult(res.result as Array<Quote>)
					resetHireLabour()
				}else{
					localStorage.setItem(StorageKeys.FORM_DATA, JSON.stringify(formData))
					setQuotesResult(res.result as Array<Quote>)
					reset()
				}
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
