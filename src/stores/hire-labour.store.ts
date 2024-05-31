import { HireLabour } from '@/types/structs';
import { create } from 'zustand';

interface Store {
  formData: HireLabour;
  update: (newData: Partial<HireLabour>) => void;
  updateField: <K extends keyof HireLabour>(fieldName: K, newValue: HireLabour[K]) => void;
  removeImage: (index: number) => void;
}

const initialState: HireLabour = {
      date: new Date(),
      time: "",
      serviceLocation: "",
      apartment: "",
      elevatorAccess: "",
      flightOfStairs: "",
      buildingType: "",
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

const useHireLabourStore = create<Store>((set) => ({
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

export default useHireLabourStore;
