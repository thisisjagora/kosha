import { BookMoveDto } from "@/types/dtos";
import axiosInstance from "../axios";
import { Endpoints } from "../endpoints";
import { ApiResponse, Quote } from "@/types/structs";

export const getQuote = async (payload: Partial<BookMoveDto>): Promise<any> => {
  try {
    const res = await axiosInstance.post(Endpoints.GET_QUOTE, {
      data: {
        searchRequest: JSON.stringify(payload),
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const getQuotes = async (
  payload: Partial<BookMoveDto>
): Promise<ApiResponse<Array<Quote>>> => {
  try {
    const res = await axiosInstance.post<ApiResponse<Array<Quote>>>(
      Endpoints.GET_QUOTES,
      {
        data: {
          searchRequest: JSON.stringify(payload),
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

