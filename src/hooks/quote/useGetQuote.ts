// import { useQuery } from "@tanstack/react-query";

// export const useGetQuote = () => {
// 	const queryClient = useQueryClient();

// 	const methods = useQuery<FilteredResponse<IBrand[]>, any>({
// 		enabled: true,
// 		queryFn: () => fetchFavouriteBrands(),
// 		queryKey: [QueryKeys.FETCH_FAVOURITE_BRANDS]
// 	});

// 	const refetchData = async () => {
// 		await queryClient.invalidateQueries();
// 		await methods.refetch();
// 	};

// 	return {
// 		...methods,
// 		data: methods.data?.data ?? [],
// 		refetchData
// 	};
// }