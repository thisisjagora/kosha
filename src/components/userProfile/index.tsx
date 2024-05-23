import { FC, PropsWithChildren } from "react"
import { Button, P } from "../atoms"
import { Edit } from "../Icons"
import { Row } from "../layout"
import { Tooltip } from "../tooltip"

export const UserProfileItem:FC<PropsWithChildren> = ({ children }) => {
      return (
            <Row className="items-center">
                  {children}
                  <Tooltip 
                        trigger={
                              <Button size="icon" variant="link">
                                    <Edit invertColor={false} width={15} height={15} />
                              </Button>
                        }
                        content="Edit"
                  />
            </Row>
      )
}