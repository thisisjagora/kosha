"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Label } from "@/components/form";
import { Input } from "@/components/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, signUpSchema } from "@/core/validators"
import { Button, P } from "../atoms";
import { toast } from "../toast/use-toast";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../passwordInput";
import Link from "next/link";
import { Routes } from "@/core/routing";
import { Row } from "../layout";
import { Checkbox } from "../checkbox";
import { InputDirectives } from "@/lib/helpers/inputDirectives";
import { useSignUp } from "@/hooks/auth/useSignUp";

export const SignUpForm = () => {
      const { signUpWithEmail, loading} = useSignUp();
      const form = useForm<z.infer<typeof signUpSchema>>({
            resolver: zodResolver(signUpSchema),
            defaultValues: {
              name: "",
              phone: "",
              email: "",
              password: "",
            },
          })

          function onSubmit(data: z.infer<typeof signUpSchema>) {
            signUpWithEmail({...data})
          }
      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField 
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Name*</FormLabel>
                                          <FormControl>
                                                <Input placeholder="William Chisimba" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}    
                        />
                        <FormField 
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Phone Number*</FormLabel>
                                          <FormControl>
                                                <Input 
                                                      placeholder="080 289 0123 456" 
                                                      {...field} 
                                                      {...InputDirectives.numbersOnly}
                                                />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />
                        <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Email*</FormLabel>
                                          <FormControl>
                                                <Input placeholder="johndoe@example.com" type="email" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />
                        <FormField 
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Password*</FormLabel>
                                          <FormControl>
                                                <PasswordInput placeholder="Min. 8 characters" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />
                        <FormField 
                              control={form.control}
                              name="acceptTerms"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormControl>
                                                <Row className="justify-between">
                                                      <Row className="flex items-center space-x-2">
                                                            <Checkbox 
                                                                  id="acceptTerms" 
                                                                  checked={field.value}
                                                                  onCheckedChange={field.onChange}
                                                            />
                                                            <Label
                                                                  htmlFor="acceptTerms"
                                                                  className="text-sm text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
                                                            >
                                                            Accept terms and conditions
                                                            </Label>
                                                      </Row>
                                                </Row>
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />
                        <div className="mt-8">
                              <Button loading={loading} type="submit" size="lg" className="w-full">Sign Up</Button>
                        </div>
                  </form>
                  <Link href={Routes.signIn}><p className="font-dm-sans font-sm font-[400] text-primary">Already have an account? <span className="font-bold">Sign in</span></p></Link>
            </Form>
      )
}