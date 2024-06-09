import { Button, P, Picture } from "@/components/atoms";
import { DateInput } from "@/components/dateInput";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import { Input } from "@/components/input";
import { Column, Row } from "@/components/layout";
import { bookDeliverySequenceStep1Schema, bookDeliverySequenceStep2Schema, bookDeliverySequenceStep3Schema } from "@/core/validators";
import { InputDirectives } from "@/lib/helpers/inputDirectives";
import { cn } from "@/lib/utils";
import useBookDeliveryStore from "@/stores/book-delivery.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SequenceStepsProps } from "..";
import { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { AlertDialog } from "@/components/dialogs";
import { Routes } from "@/core/routing";
import { toast } from "@/components/toast/use-toast";
import { Textarea } from "@/components/textarea";
import { Camera, Cancel } from "@/components/Icons";
import useShowQuotes from "@/stores/show-quotes.store";

const Step1:FC<SequenceStepsProps>  = ({ onChangeStep }) => {
      const { update, formData } = useBookDeliveryStore((state) => state)
      const {deliveryDate, time, pickUpLocation, deliveryLocation} = formData
      const form = useForm<z.infer<typeof bookDeliverySequenceStep1Schema>>({
            resolver: zodResolver(bookDeliverySequenceStep1Schema),
            defaultValues: {
                  deliveryDate,
                  time,
                  pickUpLocation,
                  deliveryLocation
            }
      })

      const onSubmit = (data: z.infer<typeof bookDeliverySequenceStep1Schema>) => {
            onChangeStep("pld")
            update(data);
      }

      return (
            <Form {...form}>
                  <form className="text-grey-300 p-6 bg-white-100 flex flex-col gap-6 rounded-xl shadow-sm" onSubmit={form.handleSubmit(onSubmit)}>
                        <Row className="gap-6">
                                    <FormField 
                                          control={form.control}
                                          name="deliveryDate"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <Column className="gap-3">
                                                                  <FormLabel className="text-grey-300">Date</FormLabel>
                                                                  <DateInput 
                                                                        field={field}
                                                                        trigger={
                                                                              <FormControl>
                                                                                    <Button
                                                                                          variant={"outline"}
                                                                                          className={cn(
                                                                                                "h-14 pl-3 text-left font-normal hover:bg-white-100 hover:scale-1",
                                                                                                !field.value && "text-muted-foreground"
                                                                                          )}
                                                                                    >
                                                                                          {field.value ? (
                                                                                                format(field.value, "PPP")
                                                                                          ) : (
                                                                                                <span></span>
                                                                                          )}
                                                                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                                    </Button>
                                                                              </FormControl>
                                                                        }
                                                                  />
                                                                  <FormMessage className="text-destructive" />
                                                      </Column>
                                                </FormItem>
                                          )}
                                    />
                                    <FormField 
                                          control={form.control}
                                          name="time"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel className="text-grey-300">Time</FormLabel>
                                                      <FormControl>
                                                            <Input {...field}/>
                                                      </FormControl>
                                                      <FormMessage className="text-destructive" />
                                                </FormItem>
                                          )}
                                    />
                        </Row>
                        <Row className="gap-6">
                                    <FormField 
                                          control={form.control}
                                          name="pickUpLocation.location"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel className="text-grey-300">Pickup Location</FormLabel>
                                                      <FormControl>
                                                            <Input {...field}/>
                                                      </FormControl>
                                                      <FormMessage className="text-destructive" />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField 
                                          control={form.control}
                                          name="pickUpLocation.apartment"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel className="text-grey-300">Apartment/Unit</FormLabel>
                                                      <FormControl>
                                                      <Input 
                                                            {...field}
                                                            {...InputDirectives.numbersOnly}
                                                      />
                                                      </FormControl>
                                                      <FormMessage className="text-destructive" />
                                                </FormItem>
                                          )}
                                    />
                        </Row>
                        <Row className="gap-6">
                                    <FormField 
                                          control={form.control}
                                          name="deliveryLocation.location"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel className="text-grey-300">Final Destination</FormLabel>
                                                      <FormControl>
                                                            <Input {...field}/>
                                                      </FormControl>
                                                      <FormMessage className="text-destructive" />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField 
                                          control={form.control}
                                          name="deliveryLocation.apartment"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel className="text-grey-300">Apartment/Unit</FormLabel>
                                                      <FormControl>
                                                            <Input 
                                                                  {...field}
                                                                  {...InputDirectives.numbersOnly}
                                                            />
                                                      </FormControl>
                                                      <FormMessage className="text-destructive" />
                                                </FormItem>
                                          )}
                                    />
                              </Row>
                        <Row className="items-center justify-center my-8">
                              <Button type="button" className="flex-1 max-w-[180px] rounded-3xl">Cancel</Button>
                              <Button type="submit" className="flex-1 max-w-[180px] bg-orange-100 rounded-3xl">Save & Continue</Button>
                        </Row>
                  </form>
            </Form>
      )
};

const Step2:FC<SequenceStepsProps>   = ({ onChangeStep }) => {
      const { formData, update } = useBookDeliveryStore((state) => state )
      const {PUDFinalDestination, PUDPickUpLocation } = formData
      const form = useForm<z.infer<typeof bookDeliverySequenceStep2Schema>>({
            resolver: zodResolver(bookDeliverySequenceStep2Schema),
            defaultValues: {
                  PUDPickUpLocation,
                  PUDFinalDestination,
            }
      })

      const onSubmit = (data: z.infer<typeof bookDeliverySequenceStep2Schema>) => {
            onChangeStep("itu")
            update(data)
      }
      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="text-grey-300">
                  <div>
                              <Row className="bg-white-100 justify-between shadow-sm rounded-xl gap-6 p-12">
                                    <Column>
                                          <P className="font-semibold text-lg">Pickup Location</P>
                                          <P className="font-bold text-primary text-xl">{formData.pickUpLocation.location}</P>
                                    </Column>
                                    <Row className="gap-4">
                                          <div className="flex items-center">
                                                <div className="mt-8 w-[80px] border border-dotted"/>
                                          </div>
                                          <Row className="gap-4">
                                                <FormField
                                                      control={form.control} 
                                                      name="PUDPickUpLocation.buildingType"
                                                      render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                  <FormLabel className="text-grey-300">Building Type</FormLabel>
                                                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                        <SelectValue placeholder="Condo" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        <SelectItem value="Condo">Condo</SelectItem>
                                                                        <SelectItem value="Apartment">Apartment</SelectItem>
                                                                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                                                                  </SelectContent>
                                                                  </Select>
                                                                  <FormMessage className="text-destructive"/>
                                                            </FormItem>
                                                      )}
                                                />
                                                <FormField
                                                      control={form.control} 
                                                      name="PUDPickUpLocation.elevatorAccess"
                                                      render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                  <FormLabel className="text-grey-300">Elevator Access</FormLabel>
                                                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                        <SelectValue placeholder="Yes" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        <SelectItem value="Yes">Yes</SelectItem>
                                                                        <SelectItem value="No">No</SelectItem>
                                                                  </SelectContent>
                                                                  </Select>
                                                                  <FormMessage className="text-destructive"/>
                                                            </FormItem>
                                                      )}
                                                />
                                                <FormField 
                                                      control={form.control}
                                                      name="PUDPickUpLocation.flightOfStairs"
                                                      render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                  <FormLabel className="text-grey-300">Flight of Stairs</FormLabel>
                                                                  <FormControl>
                                                                        <Input className="h-10 rounded-lg" {...field} {...InputDirectives.numbersOnly} />
                                                                  </FormControl>
                                                                  <FormMessage className="text-destructive"/>
                                                            </FormItem>
                                                      )}
                                                />
                                          </Row>
                                    </Row>
                              </Row>
                              <div className="px-6">
                                    <div className="relative h-[40px] max-w-max border-l-2 border-dotted border-primary" />
                              </div>
                        </div>
                        <div>
                              <Row className="bg-white-100 justify-between shadow-sm rounded-xl gap-6 p-12">
                                    <Column>
                                          <P className="font-semibold text-lg">Delivery Location</P>
                                          <P className="font-bold text-primary text-xl">{formData.deliveryLocation.location}</P>
                                    </Column>
                                    <Row className="gap-4">
                                          <div className="flex items-center">
                                                <div className="mt-8 w-[80px] border border-dotted"/>
                                          </div>
                                          <Row className="gap-4">
                                                <FormField
                                                      control={form.control} 
                                                      name="PUDFinalDestination.buildingType"
                                                      render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                  <FormLabel className="text-grey-300">Building Type</FormLabel>
                                                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                        <SelectValue placeholder="Condo" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        <SelectItem value="Condo">Condo</SelectItem>
                                                                        <SelectItem value="Apartment">Apartment</SelectItem>
                                                                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                                                                  </SelectContent>
                                                                  </Select>
                                                                  <FormMessage className="text-destructive"/>
                                                            </FormItem>
                                                      )}
                                                />
                                                <FormField
                                                      control={form.control} 
                                                      name="PUDFinalDestination.elevatorAccess"
                                                      render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                  <FormLabel className="text-grey-300">Elevator Access</FormLabel>
                                                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                        <SelectValue placeholder="Yes" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        <SelectItem value="Yes">Yes</SelectItem>
                                                                        <SelectItem value="No">No</SelectItem>
                                                                  </SelectContent>
                                                                  </Select>
                                                                  <FormMessage className="text-destructive"/>
                                                            </FormItem>
                                                      )}
                                                />
                                                <FormField 
                                                      control={form.control}
                                                      name="PUDFinalDestination.flightOfStairs"
                                                      render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                  <FormLabel className="text-grey-300">Flight of Stairs</FormLabel>
                                                                  <FormControl>
                                                                        <Input className="h-10 rounded-lg" {...field} {...InputDirectives.numbersOnly} />
                                                                  </FormControl>
                                                                  <FormMessage className="text-destructive"/>
                                                            </FormItem>
                                                      )}
                                                />
                                          </Row>
                                    </Row>
                              </Row>
                        </div>
                        <Row className="items-center justify-center my-8">
                              <Button 
                                    type="button" 
                                    className="flex-1 max-w-[180px] rounded-3xl"
                                    onClick={() => onChangeStep("dlt")}
                              >Previous</Button>
                              <Button type="submit" className="flex-1 max-w-[180px] bg-orange-100 rounded-3xl">Save & Continue</Button>
                        </Row>
                  </form>
            </Form>
      )
};

const Step3:FC<SequenceStepsProps>   = ({ onChangeStep }) => {
      const setShowQuote = useShowQuotes((state) => state.setShowQuote) 
      const { update, updateField, removeImage, formData } = useBookDeliveryStore((state) => state);
      const {images, instructions} = formData
      const form = useForm<z.infer<typeof bookDeliverySequenceStep3Schema>>({
            resolver: zodResolver(bookDeliverySequenceStep3Schema),
            defaultValues: {
                  images,
                  instructions
            }
      })

      const handleRemoveImage = (index: number) => {
            removeImage(index);
            form.setValue("images", formData.images.filter((_, i) => i !== index)); // Update the form state
      };

      const onSubmit = (data: z.infer<typeof bookDeliverySequenceStep3Schema>) => {
            update(data)
            toast({
              title: "You submitted the following values:",
              description: (
                  <pre className="mt-2 w-[340px] rounded-md p-4">
                        <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
                  </pre>
              ),
            })
      }
      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <FormField 
                              name="instructions"
                              control={form.control}
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel className="text-grey-300">Leave a Note with instructions for the delivery</FormLabel>
                                          <FormControl>
                                                <Textarea
                                                      placeholder="Leave a note for any special instructions or requests you have for the movers" 
                                                      className="resize-none"
                                                      {...field}
                                                      rows={6}
                                                />
                                          </FormControl>
                                          <FormMessage className="text-destructive"/>
                                    </FormItem>
                              )}
                        />
                        <div>
                              <Row className="items-center flex-wrap gap-4">
                                    {
                                          images.map((image, index) => (
                                                <div key={image + index} className="relative flex-1 min-w-[120px] max-w-[150px] h-[99px] group">
                                                      <Picture 
                                                            container={{
                                                                  className: "w-full h-full rounded-lg"
                                                            }}
                                                            image={{
                                                                  alt: "",
                                                                  src: image,
                                                                  className: "object-cover rounded-lg"
                                                            }}
                                                      />
                                                      <Button 
                                                            type="button" 
                                                            variant="ghost" 
                                                            className="bg-transparent hover:bg-transparent p-0 max-w-max absolute -top-4 -right-2 hidden group-hover:inline"
                                                            onClick={() => handleRemoveImage(index)}
                                                      >
                                                            <Cancel className="w-[24px] h-[24px]"/>
                                                      </Button>
                                                </div>
                                          ))
                                    }
                                    {
                                          images.length > 0 && (
                                                <FormField 
                                                      name="images"
                                                      control={form.control}
                                                      render={({ field }) => (
                                                            <FormItem className="flex-1 max-w-[150px]">
                                                                  <FormLabel htmlFor="images">
                                                                        <div className="border h-[99px] flex items-center justify-center rounded-lg">
                                                                              <span className="flex items-center justify-center bg-grey-300 w-[40px] h-[40px] rounded-full group-hover:scale-[1.05] group-hover:shadow-xl transition duration-300 ease-in-out">
                                                                                    <Camera className="w-[32px] h-[29px]"/>
                                                                              </span>
                                                                        </div>
                                                                  </FormLabel>
                                                                  <FormControl>
                                                                              <Input 
                                                                                    type="file" 
                                                                                    id="images" 
                                                                                    className="hidden" 
                                                                                    multiple
                                                                                    onChange={(e) => {
                                                                                          if(e.target.files) {
                                                                                                updateField("images", [...images, URL.createObjectURL(e.target.files[0])])
                                                                                                field.onChange([...images, URL.createObjectURL(e.target.files[0])]);
                                                                                          }
                                                                                    }}
                                                                              />
                                                                  </FormControl>
                                                            </FormItem>
                                                      )}
                                                />
                                          )
                                    }
                              </Row>
                              {
                                    images?.length <= 0 && (
                                          <FormField 
                                                name="images"
                                                control={form.control}
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel htmlFor="images">
                                                                  <Row className="items-center gap-4 group hover:cursor-pointer">
                                                                        <span className="flex items-center justify-center bg-primary w-[80px] h-[80px] rounded-full group-hover:scale-[1.05] group-hover:shadow-xl transition duration-300 ease-in-out">
                                                                              <Camera className="w-[32px] h-[29px]"/>
                                                                        </span>
                                                                        <P>Add Photo</P>
                                                                  </Row>
                                                            </FormLabel>
                                                            <FormControl>
                                                                  <Input 
                                                                        type="file" 
                                                                        id="images" 
                                                                        className="hidden" 
                                                                        multiple
                                                                        onChange={(e) => {
                                                                              if(e.target.files) {
                                                                                    updateField("images", [...images, URL.createObjectURL(e.target.files[0])])
                                                                                    field.onChange([...images, URL.createObjectURL(e.target.files[0])]);
                                                                              }
                                                                        }}
                                                                  />
                                                            </FormControl>
                                                      </FormItem>
                                                )}
                                          />
                                    )
                              }
                        </div>
                        <Row className="items-center justify-center my-8">
                              <Button 
                                    type="button" 
                                    className="flex-1 max-w-[180px] rounded-3xl"
                                    onClick={() => onChangeStep("pld")}
                              >Previous</Button>
                              <AlertDialog 
                                    trigger={
                                          <Button type="submit" className="flex-1 max-w-[180px] bg-orange-100 rounded-3xl">Send Request</Button>
                                    }
                                    title="Your Delivery Request has been Sent!"
                                    buttonLabel="View Delivery Quotes"
                                    onClick={() => setShowQuote(true)}
                              />
                        </Row>
                  </form>
            </Form>
      )
};


export const BookDeliverySequence = {
      Step1,
      Step2,
      Step3,
}