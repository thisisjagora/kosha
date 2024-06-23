import { IUser } from "@/types/structs";
import { create } from "zustand";

interface Store {
      user: IUser | null;
      updateUser: (newData: Partial<IUser> | null) => void;
    }


const useUserStore = create<Store>((set) => ({
      user: null,
      updateUser: (newData) => set((state) => {
            if (state.user) {
              return {
                user: {
                  ...state.user,
                  ...newData,
                }
              };
            } else {
              return {
                user: newData as IUser
              };
            }
          }),
    }));
    
    export default useUserStore;