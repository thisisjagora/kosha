import { toast } from "@/components/toast/use-toast";
import { ErrorMessage } from "@/constants/enums";
import { googleAutoComplete } from "@/core/api/misc";
import {GoogleAutoCompleteDto} from "@/types/dtos";
import { useMutation } from "@tanstack/react-query";

export const useGoogleAutoComplete = () => {
    
	const methods = useMutation<any, any, GoogleAutoCompleteDto>({
		mutationFn: (props) => googleAutoComplete(props)
	    });
    

	const _useGoogleAutoComplete = (payload : GoogleAutoCompleteDto ) => methods.mutateAsync(payload)

	return {
		...methods,
		googleAutoComplete: _useGoogleAutoComplete
	};
}