import { FC } from "react";
import { SequenceStepsProps } from "..";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Label } from "@/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookMoveSequenceSchema } from "@/core/validators";
import { DateInput } from "@/components/dateInput";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Column, Row } from "@/components/layout";
import { Input } from "@/components/input";
import { InputDirectives } from "@/lib/helpers/inputDirectives";
import { Add } from "@/components/Icons";
import { toast } from "@/components/toast/use-toast";

const Step1:FC<SequenceStepsProps>  = ({ onChangeStep }) => {
      const form = useForm<z.infer<typeof bookMoveSequenceSchema>>({
            resolver: zodResolver(bookMoveSequenceSchema),
            defaultValues: {
                  moveDate: new Date(),
                  time: "",
                  pickUpLocation: "",
                  pickUpApartmentUnit: "",
                  finalDestination: "",
                  finalDestinationApartmentUnit: ""

            }
      })

      const onSubmit = (data: z.infer<typeof bookMoveSequenceSchema>) => {
            onChangeStep()
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
                                          name="pickUpLocation"
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
                                          name="pickUpApartmentUnit"
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
                        <div>
                              <div className="px-6">
                                    <div className="relative h-[58px] max-w-max border-l-2 border-dotted border-primary">
                                          <Button type="button" variant="ghost" className="bg-transparent hover:bg-transparent px-0 max-w-max absolute top-[50%] -left-[14.5px] translate-y-[-50%]">
                                                <Add className="w-[27px] h-[27px] mr-2" />
                                                Add Stop
                                          </Button>
                                    </div>
                              </div>
                              <Row className="bg-white-100 rounded-xl gap-6 p-12">
                                    <FormField 
                                          control={form.control}
                                          name="finalDestination"
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
                                          name="finalDestinationApartmentUnit"
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
                        <div>
                              <div className="px-6">
                                    <div className="relative h-[58px] max-w-max border-l-2 border-dotted border-primary">
                                          <Button type="button" variant="ghost" className="bg-transparent hover:bg-transparent px-0 max-w-max absolute top-[50%] -left-[14.5px] translate-y-[-50%]">
                                                <Add className="w-[27px] h-[27px] mr-2" />
                                                Add Stop
                                          </Button>
                                    </div>
                              </div>
                              <Row className="bg-white-100 rounded-xl gap-6 p-12">
                                    <FormField 
                                          control={form.control}
                                          name="finalDestination"
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
                                          name="finalDestinationApartmentUnit"
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
      return (
            <div>
                  step 2
            </div>
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