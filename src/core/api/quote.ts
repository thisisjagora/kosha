import { BookMoveDto } from "@/types/dtos";
import axiosInstance from "../axios";
import { Endpoints } from "../endpoints";

export const getQuote = async (payload: BookMoveDto ): Promise<any> => {
      try{
            const res = await axiosInstance.post(Endpoints.GET_QUOTE, payload);
            return res
      }catch(err){
            throw err;
      }
};

export const getQuotes = async (payload: BookMoveDto ): Promise<any> => {
      console.log(payload)
      try{
            const res = await axiosInstance.post(Endpoints.GET_QUOTE, {
                  data: {
                        searchRequest: JSON.stringify(payload)
                  }
            });
            return res
      }catch(err){
            throw err;
      }
};