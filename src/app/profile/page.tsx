import { VirtualCard } from "@/components/VirtualCard";
import { Button, H, P } from "@/components/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { DeleteAccount } from "@/components/dialogs";
import { Column, Row } from "@/components/layout";
import { UserProfileItem } from "@/components/userProfile";

const Page = () => {
      return (
            <Column className="gap-4">
                  <Row className="gap-4">
                        <Column className="gap-8 flex-1 p-4 shadow-xs bg-white-100 rounded-lg max-w-[400px]">
                              <Column className="items-center relative">
                                    <div className="bg-yellow-gradient w-full h-[130px] rounded-lg"></div>
                                    <span className="absolute -bottom-6">
                                          {/* <Tooltip 
                                                trigger={
                                                      <Button className="absolute z-10 -right-6 -bottom-1" size="icon" variant="link">
                                                            <Edit invertColor={false} width={20} height={20} />
                                                      </Button>
                                                }
                                                content="Change Photo"
                                          /> */}
                                          <Avatar className="w-[70px] h-[70px] bg-[#F6DF9C]">
                                                <AvatarImage src="https://images.unsplash.com/photo-1715005881129-266ccdd75e43?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nelson Michael"/>
                                                <AvatarFallback>WC</AvatarFallback>
                                          </Avatar>
                                    </span>
                              </Column>
                              <Column className="pl-6 py-4 gap-0">
                                    <UserProfileItem>
                                          <div className="flex-1 text-center">
                                                <P className="font-dm-sans text-xl font-bold text-blue-200">William Chisimba</P>
                                          </div>
                                    </UserProfileItem>
                                    <UserProfileItem>
                                          <div className="flex-1 text-center">
                                                <P className="text-grey-100 text-lg">+23450678398549</P>
                                          </div>
                                    </UserProfileItem>
                              </Column>
                        </Column>
                        <Row className="bg-white-100 shadow-xs flex-1 p-6 rounded-lg gap-4">
                              <VirtualCard />
                              <Column className="gap-8 max-w-[200px] p-4">
                                    <Column className="gap-1">
                                          <H>Payment Methods</H>
                                          <P>Change /Update your payment methods here</P>
                                    </Column>
                                    <Button className="max-w-max">Update</Button>
                              </Column>
                        </Row>
                  </Row>
                  <Row className="gap-4 flex-wrap">
                        <Column className="flex-1 font-dm-sans p-4 bg-white-100 shadow-xs rounded-lg">
                              <Column>
                                    <H className="text-xl text-primary">Move History</H>
                                    <p className="text-primary-foreground text-base">Here you can find all your transactions on this account and you can print them out as a .pdf or .csv file</p>  
                              </Column>
                        </Column>
                        <Column className="flex-1 font-dm-sans p-4 bg-white-100 shadow-xs rounded-lg">
                              <Column>
                                    <H className="text-xl text-primary">Legal Policy</H>
                                    <p className="text-primary-foreground text-base">We believe in transparency, affordability, and excellent customer service. That&apos;s why we offer competitive pricing and easy payment options. Our app also automates the invoicing and billing process, saving you time and hassle. For any legal enquiries you may have, browse through the categories below</p>  
                              </Column>
                        </Column>
                  </Row>
                  <Row className="gap-4 flex-wrap">
                        <Column className="mt-6 flex-1 gap-4">
                              <Button variant="secondary" size="lg">Sign Out</Button>
                              <DeleteAccount trigger={<Button variant="destructive" size="lg">Delete Account</Button>} />
                        </Column>
                        <div className="flex-1"></div>
                  </Row>
            </Column>
      )
}

export default Page;