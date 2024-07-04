export interface SignInDto {
      email: string,
      password: string
}

export interface SignUpDto {
      name: string,
      phone: string,
      email: string,
      password: string
}

export interface ResetPasswordDto {
      email: string
}

export interface BookMoveDto {
      fromAddress: {
        address: string;
        apartmentNumber: string;
        buildingType: string;
        flightOfStairs: number;
        googlePlaceId: string;
        hasElevator: string;
        id: string;
      };
      toAddress: {
        address: string;
        apartmentNumber: string;
        buildingType: string;
        flightOfStairs: number;
        googlePlaceId: string;
        hasElevator: string;
        id: string;
      };
      date: string;
      addOns: Array<{
        name: string;
        quantity: number;
      }>;
      additionalStops: Array<{
        address: string;
        apartmentNumber: string;
        buildingType: string;
        flightOfStairs: number;
        googlePlaceId: string;
        hasElevator: string;
        id: string;
      }>;
      companyId: string;
      bookingId: string;
      requestType: "RegularMove" | "LabourOnly" | "LongDelivery";
}