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
  keepMeLoggedIn: z.boolean().default(false).optional(),
})

const locationSchema = z.object({
  location: z.string().min(1, {message: "Location is required"}),
  apartment: z.string().min(1, {message: "Apartment/Unit number is required"})
});

export const bookMoveSequenceStep1Schema = z.object({
  moveDate: z.date({message: "Move date is required"}),
  time: z.string().min(1, {message: "Time is required"}),
  pickUpLocation: locationSchema,
  stops: z.array(locationSchema),
  finalDestination: locationSchema
})

const pickUpDetailShema = z.object({
  buildingType: z.string().min(1, {message: "Building type is required"}),
  elevatorAccess: z.string().min(1, {message: "Elevator access is required"}),
  flightOfStairs: z.string().min(1, {message: "Flight of stairs is required"})
});

export const bookMoveSequenceStep2Schema = z.object({
  PUDPickUpLocation: pickUpDetailShema,
  PUDStops: z.array(pickUpDetailShema),
  PUDFinalDestination: pickUpDetailShema
})