"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import { Input } from "@/components/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "@/core/validators"
import { Button } from "../atoms";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Routes } from "@/core/routing";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

export const ForgotPasswordForm = () => {
      const { loading, forgotPassword } = useForgotPassword();
      const form = useForm<z.infer<typeof forgotPasswordSchema>>({
            resolver: zodResolver(forgotPasswordSchema),
            defaultValues: {
              email: "",
            },
          })

          function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
            forgotPassword(data)
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
                        <div className="mt-8">
                              <Button loading={loading} type="submit" size="lg" className="w-full">Send code</Button>
                        </div>
                  </form>
                  <Link href={Routes.signUp}><p className="font-dm-sans font-sm font-[400] text-primary">Remembered your password?<span className="font-bold"> Log in</span></p></Link>
            </Form>
      )
}