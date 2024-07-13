import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";
import { P, Picture } from "../atoms";
import { Column, Row } from "../layout";

/**
 * @example
 * // Renders a VirtualCard with a custom background and details
 *    <Background>
 *          <Details>
 *                <Column>
 *                      <Row>
 *                            <Name name={string} />
 *                            <Logo url={string} />
 *                      </Row>
 *                      <Column>
 *                            <Number value={string} />
 *                            <Row>
 *                                  <ValidDate date={Date} />
 *                                  <CVV />
 *                            </Row>
 *                      </Column>
 *                </Column>
 *          </Details>
 *    </Background>
 * 
 * Change card background like so:
 *    <Background className="bg-[new background image class]" />
 * 
 * Note: You must have already added a background image in the tsConfig file.
 * Note: Rows and Columns just for organization, you could always switch that depending on your card layout.
 */

const Background: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => <div {...rest} className={cn("text-white-100 font-dm-sans font-bold bg-virtual-card bg-cover p-8 rounded-3xl shadow-md flex-1 flex items-center justify-center", className)} />
const Details: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest}) => <div {...rest} className={cn("w-full h-full", className)} />
const Name = ({ name }: {name: string}) => <p className="text-xl">{name}</p>
const Number = ({ value }: {value: string}) => <p className="text-xl">{value}</p>
const ValidDate = ({ date }: {date: string}) => {
      return (
            <Column className="">
                  <p className="text-[10px]">VALID THRU</p>
                  <p className="text-sm">{date}</p>
            </Column>
      )
}

const CVV = ({ cvv }: { cvv: string }) => {
      return (
            <Column className="">
                  <p className="text-[10px]">CVV</p>
                  <p className="text-sm">{cvv}</p>
            </Column>
      )
}
const Logo = ({ url }: { url: string }) => <Picture 
            container={{
                  className: "min-w-[60] min-h-[40]"
            }}
            image={{
                  alt: "Card provider logo",
                  src: url
            }}
      />
export const VirtualCard =()=>{
      return (
            <Background className="w-full max-w-[400px]">
                  <Details>
                        <Column className="justify-between h-full">
                              <Row className="justify-between items-center">
                                    <Name name="William Chisimba" />
                                    <Logo url="/images/master-card-logo.png" />
                              </Row>
                              <Column className="gap-6">
                                    <Number value="7812 2139 0823 XXXX" />
                                    <Row className="justify-between max-w-max gap-12">
                                          <ValidDate date="05/24" />
                                          <CVV cvv="09X" />
                                    </Row>
                              </Column>
                        </Column>
                  </Details>
            </Background>
      )
}