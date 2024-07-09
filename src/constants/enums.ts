export enum EnvModes {
	DEV = "development",
	PROD = "production"
}

export enum QueryKeys {
	GET_QUOTES = "get-quotes"
}

export enum StorageKeys {
	QUOTES_RESULT = "quotes-result",
	QUOTE_DETAIL = "quote-detail",
	FORM_DATA = "form-data"
}

export enum FIREBASE_COLLECTIONS {
      USERS = "users",
	BOOKINGS = "bookings",
	CHATS = "chats",
	CHAT_MESSAGES = "chat_messages",
}

export enum SUCCESS_MESSAGE {
      USER_SIGNUP = "Account created successfully!",
	BOOKINGS_COMPLETE = "Booking request completed!"
}

export enum ErrorMessage {
	UNEXPECTED_ERROR = "An unexpected error occurred. Please try again.",
	SERVICE_REQUEST_MADE = "You have completed that service request!"
}

export enum CacheKey {
	CHATS_STATE = 'CHATS_STATE',
}
