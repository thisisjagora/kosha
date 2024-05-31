import { FC, useState } from "react";
import { SequenceStepsProps } from "..";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookMoveSequenceStep1Schema, bookMoveSequenceStep2Schema, bookMoveSequenceStep3Schema, bookMoveSequenceStep4Schema } from "@/core/validators";
import { DateInput } from "@/components/dateInput";
import { Button, P, Picture } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Column, Row } from "@/components/layout";
import { Input } from "@/components/input";
import { InputDirectives } from "@/lib/helpers/inputDirectives";
import { Add, Camera, Cancel } from "@/components/Icons";
import { toast } from "@/components/toast/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import useBookMoveStore from "@/stores/book-move.store";
import { Textarea } from "@/components/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { Checkbox } from "@/components/checkbox";
import { AlertDialog } from "@/components/dialogs";
import { Routes } from "@/core/routing";

const Step1:FC<SequenceStepsProps>  = ({ onChangeStep }) => {
      const {update, formData, removeStop} = useBookMoveStore((state) => state)
      const {moveDate, time, stops, pickUpLocation, finalDestination} = formData
      const form = useForm<z.infer<typeof bookMoveSequenceStep1Schema>>({
            resolver: zodResolver(bookMoveSequenceStep1Schema),
            defaultValues: {
                  moveDate,
                  time,
                  pickUpLocation,
                  stops,
                  finalDestination
            }
      })
      const { fields, append, remove } = useFieldArray({
            name: "stops",
            control: form.control
      })
      const onSubmit = (data: z.infer<typeof bookMoveSequenceStep1Schema>) => {
            onChangeStep("propertyDetail")
            update(data);
      }
      return (
            <Form {...form}>
                  <form className="text-grey-300" onSubmit={form.handleSubmit(onSubmit)}>
                        <Column className="bg-white-100 shadow-sm rounded-xl gap-6 p-12">
                              <Row className="gap-6">
                                    <FormField 
                                          control={form.control}
                                          name="moveDate"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <Column className="gap-3">
                                                                  <FormLabel>Move Date</FormLabel>
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
                                                                  <FormMessage />
                                                      </Column>
                                                </FormItem>
                                          )}
                                    />
                                    <FormField 
                                          control={form.control}
                                          name="time"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel>Time</FormLabel>
                                                      <FormControl>
                                                            <Input {...field}/>
                                                      </FormControl>
                                                      <FormMessage />
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
                                                      <FormLabel>Pickup Location</FormLabel>
                                                      <FormControl>
                                                            <Input {...field}/>
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField 
                                          control={form.control}
                                          name="pickUpLocation.apartment"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel>Apartment/Unit</FormLabel>
                                                      <FormControl>
                                                      <Input 
                                                            {...field}
                                                            {...InputDirectives.numbersOnly}
                                                      />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                              </Row>
                        </Column>
                        <AnimatePresence>
                              <div>
                                    {
                                          fields.map((field, index) => (
                                                <motion.div 
                                                      key={field.id}
                                                      initial={{
                                                            opacity: 0,
                                                            y: -100,
                                                      }}
                                                      animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                      }}
                                                      exit={{
                                                            opacity: 0,
                                                            y: 100,
                                                      }} 
                                                      className="group"
                                                >
                                                      <Row className="px-6 justify-between items-center">
                                                                  <div className="relative h-[58px] max-w-max border-l-2 border-dotted border-primary" />
                                                                  <Button 
                                                                        type="button" 
                                                                        variant="ghost" 
                                                                        className="bg-transparent hover:bg-transparent px-0 max-w-max hidden group-hover:inline"
                                                                        onClick={() => {
                                                                              remove(index)
                                                                              removeStop(index)
                                                                        }}
                                                                  >
                                                                        <span className="bg-primary w-[27px] h-[27px] rounded-full flex items-center justify-center">
                                                                              <div className="border w-3"/>
                                                                        </span>
                                                                  </Button>
                                                      </Row>
                                                      <Row className="bg-white-100 shadow-sm rounded-xl gap-6 p-12">
                                                                  <FormField 
                                                                        control={form.control}
                                                                        name={`stops.${index}.location`}
                                                                        render={({ field }) => (
                                                                              <FormItem className="flex-1">
                                                                                    <FormLabel>Stop {index + 1}</FormLabel>
                                                                                    <FormControl>
                                                                                          <Input {...field}/>
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                              </FormItem>
                                                                        )}
                                                                  />
                                                                  <FormField 
                                                                        control={form.control}
                                                                        name={`stops.${index}.apartment`}
                                                                        render={({ field }) => (
                                                                              <FormItem className="flex-1">
                                                                                    <FormLabel>Apartment/Unit</FormLabel>
                                                                                    <FormControl>
                                                                                          <Input 
                                                                                                {...field}
                                                                                                {...InputDirectives.numbersOnly}
                                                                                          />
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                              </FormItem>
                                                                        )}
                                                                  />
                                                      </Row>
                                                </motion.div>
                                          ))
                                    }
                              </div>
                        </AnimatePresence>
                        <div>
                              <div className="px-6">
                                    <div className="relative h-[58px] max-w-max border-l-2 border-dotted border-primary">
                                          <Button 
                                                type="button" 
                                                variant="ghost" 
                                                className="bg-transparent hover:bg-transparent px-0 max-w-max absolute top-[50%] -left-[14.5px] translate-y-[-50%]"
                                                onClick={() => append({
                                                      location: "",
                                                      apartment: ""
                                                })}
                                          >
                                                <Add className="w-[27px] h-[27px] mr-2" />
                                                Add Stop
                                          </Button>
                                    </div>
                              </div>
                              <Row className="bg-white-100 shadow-sm rounded-xl gap-6 p-12">
                                    <FormField 
                                          control={form.control}
                                          name="finalDestination.location"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel>Final Destination</FormLabel>
                                                      <FormControl>
                                                            <Input {...field}/>
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField 
                                          control={form.control}
                                          name="finalDestination.apartment"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel>Apartment/Unit</FormLabel>
                                                      <FormControl>
                                                            <Input 
                                                                  {...field}
                                                                  {...InputDirectives.numbersOnly}
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                              </Row>
                        </div>
                        <Row className="items-center justify-center my-8">
                              <Button type="button" className="flex-1 max-w-[180px] rounded-3xl">Cancel</Button>
                              <Button type="submit" className="flex-1 max-w-[180px] bg-orange-100 rounded-3xl">Save & Continue</Button>
                        </Row>
                  </form>
            </Form>
      )
};

const Step2:FC<SequenceStepsProps>  = ({ onChangeStep }) => {
      const { formData, update } = useBookMoveStore((state) => state )
      const {PUDFinalDestination, PUDPickUpLocation, PUDStops} = formData
      const form = useForm<z.infer<typeof bookMoveSequenceStep2Schema>>({
            resolver: zodResolver(bookMoveSequenceStep2Schema),
            defaultValues: {
                  PUDPickUpLocation,
                  PUDFinalDestination,
                  PUDStops
            }
      })

      const onSubmit = (data: z.infer<typeof bookMoveSequenceStep2Schema>) => {
            onChangeStep("generalInfo")
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
                        {
                              formData.stops.map((stop, index) => (
                                    <div key={stop.location + index}>
                                          <Row className="bg-white-100 justify-between shadow-sm rounded-xl gap-6 p-12">
                                                <Column>
                                                      <P className="font-semibold text-lg">Stop {index + 1}</P>
                                                      <P className="font-bold text-primary text-xl">{stop.location}</P>
                                                </Column>
                                                <Row className="gap-4">
                                                      <div className="flex items-center">
                                                            <div className="mt-8 w-[80px] border border-dotted"/>
                                                      </div>
                                                      <Row className="gap-4">
                                                            <FormField
                                                                  control={form.control} 
                                                                  name={`PUDStops.${index}.buildingType`}
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
                                                                  name={`PUDStops.${index}.elevatorAccess`}
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
                                                                  name={`PUDStops.${index}.flightOfStairs`}
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
                              ))
                        }
                        <div>
                              <Row className="bg-white-100 justify-between shadow-sm rounded-xl gap-6 p-12">
                                    <Column>
                                          <P className="font-semibold text-lg">Final Destination</P>
                                          <P className="font-bold text-primary text-xl">{formData.finalDestination.location}</P>
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
                                    onClick={() => onChangeStep("dateAndTime")}
                              >Previous</Button>
                              <Button type="submit" className="flex-1 max-w-[180px] bg-orange-100 rounded-3xl">Save & Continue</Button>
                        </Row>
                  </form>
            </Form>
      )
};

const Step3:FC<SequenceStepsProps>  = ({ onChangeStep }) => {
      const { update, updateField, removeImage, formData } = useBookMoveStore((state) => state)
      const {majorAppliances, workOutEquipment, pianos, hotTubs, poolTables, numberOfBoxes, instructions, images } = formData
      const form = useForm<z.infer<typeof bookMoveSequenceStep3Schema>>({
            resolver: zodResolver(bookMoveSequenceStep3Schema),
            defaultValues: {
                  majorAppliances,
                  workOutEquipment,
                  pianos,
                  hotTubs,
                  poolTables,
                  numberOfBoxes,
                  instructions,
                  images
            }
      })

      const handleRemoveImage = (index: number) => {
        removeImage(index);
        form.setValue("images", formData.images.filter((_, i) => i !== index)); // Update the form state
      };
      const onSubmit = (data: z.infer<typeof bookMoveSequenceStep3Schema>) => {
            onChangeStep("serviceRequirement")
            update(data);
      }
      return (
            <Form {...form}>
                  <form className="text-grey-300 p-6 bg-white-100 flex flex-col gap-6 shadow-sm rounded-xl" onSubmit={form.handleSubmit(onSubmit)}>
                        <Row className="flex-wrap gap-6">
                              <FormField 
                                    name="majorAppliances"
                                    control={form.control}
                                    render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel className="text-grey-300">Major Appliances</FormLabel>
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
                              <FormField 
                                    name="workOutEquipment"
                                    control={form.control}
                                    render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel className="text-grey-300">Workout Equipment</FormLabel>
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
                        <Row className="flex-wrap gap-6">
                              <FormField 
                                    name="pianos"
                                    control={form.control}
                                    render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel className="text-grey-300">Pianos</FormLabel>
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
                              <FormField 
                                    name="hotTubs"
                                    control={form.control}
                                    render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel className="text-grey-300">Hot Tubs</FormLabel>
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
                        <Row className="flex-wrap gap-6">
                              <FormField 
                                    name="poolTables"
                                    control={form.control}
                                    render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel className="text-grey-300">Pool Tables</FormLabel>
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
                              <FormField 
                                    name="numberOfBoxes"
                                    control={form.control}
                                    render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel className="text-grey-300">Number of Boxes</FormLabel>
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
                        <FormField 
                              name="instructions"
                              control={form.control}
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel className="text-grey-300">Instructions</FormLabel>
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
                                    onClick={() => onChangeStep("propertyDetail")}
                              >Previous</Button>
                              <Button type="submit" className="flex-1 max-w-[180px] bg-orange-100 rounded-3xl">Save & Continue</Button>
                        </Row>
                  </form>
            </Form>
      )
};

const Step4:FC<SequenceStepsProps>  = ({ onChangeStep })  => {
      const { update, formData } = useBookMoveStore((state) => state)
      const [selectAll, setSelectAll] = useState<boolean>(false);
      const form = useForm<z.infer<typeof bookMoveSequenceStep4Schema>>({
            resolver: zodResolver(bookMoveSequenceStep4Schema),
            defaultValues: {
                  services: []
            }
      });

      const onSubmit = (data: z.infer<typeof bookMoveSequenceStep4Schema>) => {
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

      const services  = [
            {
                  id: "reassembly",
                  label: "Reassembly",
                  description: "Reassembling of any equipment, furniture, new or old when at the final destination of the move" 
            },
            {
                  id: "disassembly",
                  label: "Disassembly",
                  description: "Disassembling of any equipment, furniture, new or old when at the at pick up locations" 
            },
            {
                  id: "furniture wrapping",
                  label: "Furniture Wrapping",
                  description: "Wrapping furniture with protective wraps like nylon, bubble, tarp etc" 
            },
            {
                  id: "dollies",
                  label: "Dollies",
                  description: "To help you transport large heavy-based items" 
            },
            {
                  id: "moving pads",
                  label: "Moving Pads",
                  description: "Heavy duty moving blankets to prevent scratches when moving furniture" 
            },
            {
                  id: "straps",
                  label: "Straps",
                  description: "Industrial grade straps to secure all equipment, boxes etc" 
            },
            {
                  id: "floor runners",
                  label: "Floor Runners",
                  description: "To help you transport large heavy-based items" 
            },
            {
                  id: "tape",
                  label: "Tape",
                  description: "Industrial grade straps to secure all equipment, boxes etc" 
            },
            {
                  id: "move garage items",
                  label: "Move Garage Items",
                  description: "Move Garage Items" 
            },
            {
                  id: "move patio items",
                  label: "Move Patio Items",
                  description: "Move Patio Items" 
            }
      ]

      const handleSelectAllChange = (checked: boolean) => {
            setSelectAll(checked);
            form.setValue(
              "services",
              checked ? services.map((service) => service.id) : []
            );
          };

      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="text-grey-300 p-6 bg-white-100 flex flex-col gap-6 rounded-xl shadow-sm">
                        <Table>
                              <TableHeader>
                                    <Row className="mb-4 items-center">
                                          <FormControl>
                                                <Checkbox
                                                id="select-all"
                                                checked={selectAll}
                                                onCheckedChange={handleSelectAllChange}
                                                />
                                          </FormControl>
                                          <FormLabel htmlFor="select-all" className="font-medium text-base ml-2 hover:cursor-pointer">
                                                Select All
                                          </FormLabel>
                                    </Row>
                                    <TableRow>
                                          <TableHead className="w-[300px] text-grey-100">Services</TableHead>
                                          <TableHead className="text-grey-100">Description</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {services.map((service, index) => (
                                    <TableRow className="border-none hover:cursor-pointer" key={service.id + index}>
                                          <TableCell>
                                                <FormField
                                                      control={form.control}
                                                      name="services"
                                                      render={({ field }) => {
                                                      const checkboxId = `services-${service.id}`;
                                                      const isChecked = field.value?.includes(service.id)
                                                      return (
                                                            <FormItem key={service.id} className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                  <Checkbox
                                                                        className="data-[state=checked]:bg-orange-100 data-[state=checked]:border-orange-100"
                                                                        id={checkboxId}
                                                                        checked={isChecked}
                                                                        onCheckedChange={(checked) => {
                                                                        return checked
                                                                        ? field.onChange([...field.value || [], service.id])
                                                                        : field.onChange(field.value?.filter((value) => value !== service.id));
                                                                        }}
                                                                  />
                                                            </FormControl>
                                                            <FormLabel htmlFor={checkboxId} className={cn("font-medium text-grey-100", {
                                                                  "text-primary font-medium": isChecked
                                                            })}>
                                                                  {service.label}
                                                            </FormLabel>
                                                            </FormItem>
                                                      );
                                                      }}
                                                />
                                          </TableCell>
                                          <TableCell>
                                                <FormLabel htmlFor={`services-${service.id}`} className={cn("font-medium")}>
                                                      {service.description}
                                                </FormLabel>
                                          </TableCell>
                                    </TableRow>
                                    ))}
                              </TableBody>
                        </Table>
                        <Row className="items-center justify-center my-8">
                              <Button 
                                    type="button" 
                                    className="flex-1 max-w-[180px] rounded-3xl"
                                    onClick={() => onChangeStep("generalInfo")}
                              >Previous</Button>
                              <AlertDialog 
                                    trigger={
                                          <Button type="submit" className="flex-1 max-w-[180px] bg-orange-100 rounded-3xl">Send Request</Button>
                                    }
                                    title="Move Request Sent!"
                                    route={Routes.profile}
                                    routeLabel="View Vendor Quotes"
                              />
                        </Row>
                  </form>
            </Form>
      )
};

export const BookMoveSequence = {
      Step1,
      Step2,
      Step3,
      Step4,
}