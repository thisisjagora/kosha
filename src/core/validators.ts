import { z } from "zod";

const emailSchema =  z.string().email({ message: "Invalid email address" });

export const signInSchema = z.object({
      email: emailSchema,
      password: z.string().min(1, {message: "Password is required"}),
      keepMeLoggedIn: z.boolean().default(false).optional(),
    });

export const signUpSchema = z.object({
  name: z.string()
  .trim()
  .refine(value => {
    const names = value.split(/\s+/);
    return names.length === 2 && names.every(name => name.length >= 2);
  }, {
    message: "Full name should include both first name and last name"
  }),
  phone: z.string().regex(/^(?:\+234|0)?(70|80|81|90|91)\d{8}$/, { message: "Invalid Nigerian phone number format" }),
  email: emailSchema,
  password: z.string().min(1, {message: "Password is required"}),
  acceptTerms: z.boolean(),
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

const locationSchema = z.object({
  location: z.string().min(1, {message: "Location is required"}),
  apartmentNumber: z.string().optional(),
  googlePlaceId: z.string().optional()
});

export const bookMoveSequenceStep1Schema = z.object({
  moveDate: z.date({message: "Move date is required"}),
  time: z.string().min(1, {message: "Time is required"}),
  pickUpLocation: locationSchema,
  stops: z.array(locationSchema),
  finalDestination: locationSchema
})

const pickUpDetailSchema = z.object({
  buildingType: z.string().min(1, {message: "Required"}),
  elevatorAccess: z.string().min(1, {message: "Required"}),
  flightOfStairs: z.string().optional()
});

export const bookMoveSequenceStep2Schema = z.object({
  PUDPickUpLocation: pickUpDetailSchema,
  PUDStops: z.array(pickUpDetailSchema).optional(),
  PUDFinalDestination: pickUpDetailSchema
});

export const bookMoveSequenceStep3Schema = z.object({
  majorAppliances: z.string().optional(),
  workOutEquipment: z.string().optional(),
  pianos: z.string().optional(),
  hotTubs: z.string().optional(),
  poolTables: z.string().optional(),
  numberOfBoxes: z.string().optional(),
  instructions: z.string().optional(),
  images: z.array(z.string())
});


export const bookMoveSequenceStep4Schema = z.object({
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export const hireLabourSequenceStep1Schema = z.object({
  date: z.date({message: "Move date is required"}),
  time: z.string().min(1, {message: "Time is required"}),
  serviceLocation: z.string().min(1, {message: "Location is required"}),
  apartmentNumber: z.string().optional(),
  googlePlaceId: z.string().optional()
}).extend(pickUpDetailSchema.shape);

export const hireLabourSequenceStep2Schema = bookMoveSequenceStep3Schema;

export const hireLabourSequenceStep3Schema = bookMoveSequenceStep4Schema;

export const bookDeliverySequenceStep1Schema = z.object({
  deliveryDate: z.date({message: "Move date is required"}),
  time: z.string().min(1, {message: "Time is required"}),
  pickUpLocation: locationSchema,
  deliveryLocation: locationSchema
})

export const bookDeliverySequenceStep2Schema = bookMoveSequenceStep2Schema.omit({
  PUDStops: true
})

export const bookDeliverySequenceStep3Schema = bookMoveSequenceStep3Schema.pick({
  images: true,
  instructions: true
}) 

export const sendMessageSchema = z.object({
  message: z.string().optional(),
  file: typeof window === 'undefined' ? z.any().optional() : z.instanceof(File).optional(),
})