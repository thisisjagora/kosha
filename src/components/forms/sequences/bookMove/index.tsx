import { FC } from "react";
import { SequenceStepsProps } from "..";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Label } from "@/components/form";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookMoveSequenceStep1Schema, bookMoveSequenceStep2Schema } from "@/core/validators";
import { DateInput } from "@/components/dateInput";
import { Button, P } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Column, Row } from "@/components/layout";
import { Input } from "@/components/input";
import { InputDirectives } from "@/lib/helpers/inputDirectives";
import { Add } from "@/components/Icons";
import { toast } from "@/components/toast/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import useBookMoveStore from "@/stores/book-move.store";

const Step1:FC<SequenceStepsProps>  = ({ onChangeStep }) => {
      const {update} = useBookMoveStore((state) => state)
      const form = useForm<z.infer<typeof bookMoveSequenceStep1Schema>>({
            resolver: zodResolver(bookMoveSequenceStep1Schema),
            defaultValues: {
                  moveDate: new Date(),
                  time: "",
                  pickUpLocation:{
                        location: "",
                        apartment: ""
                  },
                  finalDestination: {
                        location: "",
                        apartment: ""
                  }
            }
      })
      const { fields, append, remove } = useFieldArray({
            name: "stops",
            control: form.control
      })
      const onSubmit = (data: z.infer<typeof bookMoveSequenceStep1Schema>) => {
            onChangeStep("propertyDetail")
            update(data);
            toast({
                  title: "You submitted the following values:",
                  description: (
                    <pre className="mt-2 w-[340px] rounded-md p-4">
                      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                  ),
                })
      }
      return (
            <Form {...form}>
                  <form className="text-grey-300" onSubmit={form.handleSubmit(onSubmit)}>
                        <Column className="bg-white-100 rounded-xl gap-6 p-12">
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
                                                                        onClick={() => remove(index)}
                                                                  >
                                                                        <span className="bg-primary w-[27px] h-[27px] rounded-full flex items-center justify-center">
                                                                              <div className="border w-3"/>
                                                                        </span>
                                                                  </Button>
                                                      </Row>
                                                      <Row className="bg-white-100 rounded-xl gap-6 p-12">
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
                              <Row className="bg-white-100 rounded-xl gap-6 p-12">
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
      const form = useForm<z.infer<typeof bookMoveSequenceStep2Schema>>({
            resolver: zodResolver(bookMoveSequenceStep2Schema),
            defaultValues: {
                  PUDPickUpLocation: {
                        buildingType: "",
                        elevatorAccess: "",
                        flightOfStairs: ""
                  },
                  PUDFinalDestination: {
                        buildingType: "",
                        elevatorAccess: "",
                        flightOfStairs: ""
                  }
            }
      })

      // const { fields } = useFieldArray({
      //       name: "PUDStops",
      //       control: form.control
      // })

      const onSubmit = (data: z.infer<typeof bookMoveSequenceStep2Schema>) => {
            onChangeStep("generalInfo")
            update(data)
            toast({
                  title: "You submitted the following values:",
                  description: (
                    <pre className="mt-2 w-[340px] rounded-md p-4">
                      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                  ),
                })
      }
      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="text-grey-300">
                        <div>
                              <Row className="bg-white-100 justify-between rounded-xl gap-6 p-12">
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
                                          <Row className="bg-white-100 justify-between rounded-xl gap-6 p-12">
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
                              <Row className="bg-white-100 justify-between rounded-xl gap-6 p-12">
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
      return (
            <div>
                  step 3
            </div>
      )
};

const Step4:FC<SequenceStepsProps>  = ({ onChangeStep })  => {
      return (
            <div>
                  step 4
            </div>
      )
};

export const BookMoveSequence = {
      Step1,
      Step2,
      Step3,
      Step4,
}