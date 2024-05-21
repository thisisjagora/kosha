/**
 * Custom hook to check if the current route is valid against a list of allowed routes.
 *
 * @param {string|string[]} value
 * @returns {boolean}
 **/
import { usePathname } from "next/navigation";

type useValidRouteOverload = {
	(value?: string): { isValidRoute: boolean };
	(value?: string[]): { isValidRoute: boolean };
};

export const useValidRoute: useValidRouteOverload = (value: unknown) => {
	const path = usePathname();
	let validRoutes: string[] = [];

	if (typeof value === "string") {
		validRoutes.push(value || "");
	} else if (Array.isArray(value)) {
		validRoutes = [...validRoutes, ...value];
	}

	const isValidRoute = validRoutes.includes(path || "");
	return {
		isValidRoute
	}
};
