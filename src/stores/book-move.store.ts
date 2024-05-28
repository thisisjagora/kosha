import { BookMove } from '@/types/structs';
import { create } from 'zustand';

interface Store {
  formData: BookMove;
  update: (newData: Partial<BookMove>) => void;
}

const initialState: BookMove = {
      moveDate: new Date(),
      time: "",
      pickUpLocation: {
            location: "",
            apartment: ""
      },
      stops: [
            {
                  location: "",
                  apartment: ""
            }
      ],
      finalDestination: {
            location: "",
            apartment: ""
      },
      PUDFinalDestination: {
            elevatorAccess: "",
            flightOfStairs: "",
            buildingType: ""
      },
      PUDPickUpLocation: {
            elevatorAccess: "",
            flightOfStairs: "",
            buildingType: ""
      },
      PUDStops: [
            {
                  elevatorAccess: "",
                  flightOfStairs: "",
                  buildingType: ""
            }
      ]
}

const useBookMoveStore = create<Store>((set) => ({
  formData: initialState,
  update: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }
  }))
}));

export default useBookMoveStore;
