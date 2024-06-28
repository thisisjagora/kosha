import { Row } from "@/components/layout";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
      return (
            <Row className="flex justify-center items-center h-full pb-24">
                  {children}
                  <div className="flex-1 hidden md:block">

                  </div>
            </Row>
      )
}

export default Layout;