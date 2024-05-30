import { FC, ReactNode } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Column, Row } from "../layout";
import { Button, P } from "../atoms";
import { Check } from "../Icons";
import { CustomDialogProp } from ".";
import Link from "next/link";

interface Props extends CustomDialogProp {
      title: string,
      description?: string,
      route: string,
      routeLabel: string
}

export const AlertDialog: FC<Props> = (props) => {
      return (
            <Dialog>
                  <DialogTrigger asChild>{props.trigger}</DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                        <Column className="items-center justify-center gap-8 md:px-24">
                              <Check className="w-[80px] h-[100px]"/>
                              <Column className="items-center">
                                    <P className="text-center font-semibold text-2xl text-grey-300">{props.title}</P>
                                    <P className="text-center text-grey-300">{props.description}</P>
                              </Column>
                              <Link className="w-full p-3 bg-primary text-white-100 text-center rounded-2xl" href={props.route}>{props.routeLabel}</Link>
                        </Column>
                  </DialogContent>
            </Dialog>
      )
}