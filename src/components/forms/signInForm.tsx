"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Label } from "@/components/form";
import { Input } from "@/components/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/core/validators"
import { Button, P } from "../atoms";
import { toast } from "../toast/use-toast";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../passwordInput";
import Link from "next/link";
import { Routes } from "@/core/routing";
import { Row } from "../layout";
import { Checkbox } from "../checkbox";

export const SignInForm = () => {
      const form = useForm<z.infer<typeof signInSchema>>({
            resolver: zodResolver(signInSchema),
            defaultValues: {
              email: "",
              password: "",
              keepMeLoggedIn: false
            },
          })

          function onSubmit(data: z.infer<typeof signInSchema>) {
            toast({
              title: "You submitted the following values:",
              description: `${data.email}, ${data.password}, ${data.keepMeLoggedIn}`
            })
          }
      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                              name="keepMeLoggedIn"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormControl>
                                                <Row className="justify-between">
                                                      <Row className="flex items-center space-x-2">
                                                            <Checkbox 
                                                                  id="keepMeLoggedIn" 
                                                                  checked={field.value}
                                                                  onCheckedChange={field.onChange}
                                                            />
                                                            <Label
                                                                  htmlFor="keepMeLoggedIn"
                                                                  className="text-sm text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
                                                            >
                                                            Keep me logged in
                                                            </Label>
                                                      </Row>

                                                      <Link href={Routes.forgotPassword} className="text-primary text-sm">Forgot password?</Link>
                                                </Row>
                                          </FormControl>
                                    </FormItem>
                              )}
                        />
                        <div className="mt-8">
                              <Button type="submit" size="lg" className="w-full">Sign In</Button>
                        </div>
                  </form>
                  <Link href={Routes.signUp}><p className="font-dm-sans font-sm font-[400] text-primary">Not registered yet? <span className="font-bold">Create an Account</span></p></Link>
            </Form>
      )
}