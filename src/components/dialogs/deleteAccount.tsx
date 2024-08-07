import { FC, ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Column, Row } from "../layout";
import { Button, P } from "../atoms";
import { Trash } from "../Icons";
import { useDeleteAccount } from "@/hooks/auth/useDeleteAccount";

export interface CustomDialogProp {
      trigger: ReactNode;
}
export const DeleteAccount: FC<CustomDialogProp> = ({ trigger }) => {
      const {deleteAccount, loading} = useDeleteAccount();
      const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
      return (
            <Dialog
                  open={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
            >
                  <DialogTrigger asChild>{trigger}</DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                        <Column className="items-center justify-center gap-8 md:px-24">
                              <Column className="items-center">
                                    <Trash className="w-[80px] h-[100px]"/>
                                    <P className="text-center font-semibold text-2xl text-grey-300">Delete Your Account</P>
                              </Column>
                              <P className="text-center text-grey-300">You will lose all your information if you continue. Are you sure you want to delete your account?</P>
                              <Row className="w-full">
                                    <Button 
                                          size="default" 
                                          className="flex-1"
                                          onClick={() => setIsDialogOpen(false)}
                                    >Cancel</Button>
                                    <Button
                                          onClick={deleteAccount} 
                                          loading={loading} 
                                          size="default" 
                                          variant="destructive" 
                                          className="flex-1"
                                    >Delete</Button>
                              </Row>
                        </Column>
                  </DialogContent>
            </Dialog>
      )
}