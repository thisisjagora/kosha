import { BookMove, Services } from '@/types/structs';
import { create } from 'zustand';

interface Store {
  formData: BookMove;
  update: (newData: Partial<BookMove>) => void;
  updateField: <K extends keyof BookMove>(fieldName: K, newValue: BookMove[K]) => void;
  removeStop: (index: number) => void;
  removeImage: (index: number) => void;
  reset: () => void;
}

const initialState: BookMove = {
      moveDate: new Date(),
      time: "",
      pickUpLocation: {
            location: "",
            apartmentNumber: ""
      },
      stops: [],
      finalDestination: {
            location: "",
            apartmentNumber: ""
      },
      PUDFinalDestination: {
            elevatorAccess: "Yes",
            flightOfStairs: "0",
            buildingType: "Condo"
      },
      PUDPickUpLocation: {
            elevatorAccess: "Yes",
            flightOfStairs: "0",
            buildingType: "Condo"
      },
      PUDStops: [],
      majorAppliances: "",
      workOutEquipment: "",
      pianos:"",
      hotTubs: "",
      poolTables: "",
      numberOfBoxes: "",
      instructions: "",
      images: [],
      services:[]
}

const useBookMoveStore = create<Store>((set) => ({
  formData: initialState,
  update: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }
  })),
  updateField: (fieldName, newValue) => set((state) => ({
      formData: { ...state.formData, [fieldName]: newValue }
    })),
  removeStop: (index) => set((state) => ({
      formData: {
        ...state.formData,
        stops: state.formData.stops.filter((_, i) => i !== index),
        PUDStops: state.formData.PUDStops?.filter((_, i) => i !== index)
      }
    })),
    removeImage: (index) => set((state) => {
      const newImages = state.formData.images.filter((_, i) => i !== index);
      return {
        formData: { ...state.formData, images: newImages }
      };
    }),
    reset: () => set({ formData: initialState })
}));

export default useBookMoveStore;
