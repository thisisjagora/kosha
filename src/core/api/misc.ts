import { ApiResponse } from "@/types/structs";
import axiosInstance from "../axios";
import { Endpoints } from "../endpoints";
import { GoogleAutoCompleteDto } from "@/types/dtos";

export const googleAutoComplete = async (payload: GoogleAutoCompleteDto): Promise<ApiResponse<any>> => {
      try {
        const res = await axiosInstance.post<ApiResponse<any>>(Endpoints.GET_GOOGLE_PLACE_AUTO_COMPLETE, {
          data: {
            ...payload
          }
        });
        return res.data;
      } catch (err) {
        throw err;
      }
    }; 