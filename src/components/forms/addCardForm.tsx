import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form"
import { addCardSchema } from "@/core/validators"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../input"
import { Row } from "../layout"
import { InputDirectives } from "@/lib/helpers/inputDirectives"
import { Button } from "../atoms"

export const AddCardFrom = () => {
      const form = useForm<z.infer<typeof addCardSchema>>({
            resolver: zodResolver(addCardSchema),
            defaultValues:{
                  name: "",
                  cardNumber: "",
                  expiryDate: "",
                  cvv: ""
            }
      })
      const onSubmit = (data: z.infer<typeof addCardSchema>) => {
            console.log(data);
      }
      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField 
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Billed to</FormLabel>
                                                      <FormControl>
                                                            <Input placeholder="Name" {...field} />
                                                      </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}    
                              />
                              <FormField 
                                          control={form.control}
                                          name="cardNumber"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel className="sr-only">Card Number</FormLabel>
                                                      <FormControl>
                                                            <Input 
                                                                  placeholder="Card Number" 
                                                                  {...field} 
                                                                  {...InputDirectives.numbersOnly}
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                              <Row>
                                    <FormField 
                                          control={form.control}
                                          name="expiryDate"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel className="sr-only">Expiry Date</FormLabel>
                                                            <FormControl>
                                                                  <Input placeholder="MM/YY" {...field} />
                                                            </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}    
                                    />
                                    <FormField 
                                          control={form.control}
                                          name="cvv"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <FormLabel className="sr-only">CVV</FormLabel>
                                                      <FormControl>
                                                            <Input 
                                                                  placeholder="CVV" 
                                                                  {...field} 
                                                                  {...InputDirectives.numbersOnly}
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                              </Row>
                              <Button className="mt-4">Update</Button>
                  </form>
            </Form>
      )
}