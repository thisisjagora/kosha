import { BookDelivery } from '@/types/structs';
import { create } from 'zustand';

interface Store {
  formData: BookDelivery;
  update: (newData: Partial<BookDelivery>) => void;
  updateField: <K extends keyof BookDelivery>(fieldName: K, newValue: BookDelivery[K]) => void;
  removeImage: (index: number) => void;
}

const initialState: BookDelivery = {
      deliveryDate: new Date(),
      time: "",
      pickUpLocation: {
            location: "",
            apartment: ""
      },
      deliveryLocation: {
            location: "",
            apartment: ""
      },
      PUDFinalDestination: {
            buildingType: "",
            elevatorAccess: "",
            flightOfStairs: ""
      },
      PUDPickUpLocation: {
            buildingType: "",
            elevatorAccess: "",
            flightOfStairs: ""
      },
      images: [],
      instructions: ""

}

const useBookDeliveryStore = create<Store>((set) => ({
  formData: initialState,
  update: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }
  })),
  updateField: (fieldName, newValue) => set((state) => ({
      formData: { ...state.formData, [fieldName]: newValue }
    })),
  removeImage: (index) => set((state) => {
      const newImages = state.formData.images.filter((_, i) => i !== index);
      return {
        formData: { ...state.formData, images: newImages }
      };
    })
}));

export default useBookDeliveryStore;
