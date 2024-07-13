import { Caret } from "@/components/Icons";
import { H, P } from "@/components/atoms"
import { ForgotPasswordForm } from "@/components/forms/forgotPasswordForm";
import { Column, Row } from "@/components/layout";
import Link from "next/link";

const Page = () => {
      return (
            <div className="flex-1 flex items-center justify-center h-full">
                  <Column className="justify-between gap-10 h-full w-full max-w-[420px]">
                        <Link href="/">
                              <Row className="text-primary-foreground font-dm-sans max-w-max p-2 items-center gap-4">
                                    <Caret width={22} height={22}/>
                                    <p className="">Back to Website</p>
                              </Row>
                        </Link>
                        <Row className="flex-1 items-center">
                              <Column className="gap-10 w-full">
                                    <Column className="">
                                          <H level={1} className="text-primary m-0 text-4xl">Forgot Password</H>
                                          <P className="text-primary-foreground m-0 text-base font-dm-sans">Dont worry! It happens. Please enter the email associated with your account</P>
                                    </Column>
                                    <ForgotPasswordForm />
                              </Column>
                        </Row>
                  </Column>
            </div>
      )
}

export default Page;