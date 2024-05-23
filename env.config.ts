import { EnvModes } from "@/constants/enums";

const appConfig = (): EnvValues => {
	switch (process.env.NODE_ENV) {
		case EnvModes.DEV:
			return {
				BASE_URL: ``,
				env: "DEV",
			};
		case EnvModes.PROD: {
			return {
				BASE_URL: ``,
				env: "PROD",
			};
		}
		default: {
			return {
				BASE_URL: "",
				env: "DEV",
			};
		}
	}
};

type EnvValues = {
	BASE_URL: string;
	env: keyof typeof EnvModes;
};

export default appConfig();
