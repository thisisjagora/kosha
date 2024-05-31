import { BookMove } from '@/types/structs';
import { create } from 'zustand';

interface Store {
  formData: BookMove;
  update: (newData: Partial<BookMove>) => void;
  updateField: <K extends keyof BookMove>(fieldName: K, newValue: BookMove[K]) => void;
  removeStop: (index: number) => void;
  removeImage: (index: number) => void;
}

const initialState: BookMove = {
      moveDate: new Date(),
      time: "",
      pickUpLocation: {
            location: "",
            apartment: ""
      },
      stops: [],
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
      PUDStops: [],
      majorAppliances: "",
      workOutEquipment: "",
      pianos:"",
      hotTubs: "",
      poolTables: "",
      numberOfBoxes: "",
      instructions: "",
      images: [],
      services: []
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
    })
}));

export default useBookMoveStore;
