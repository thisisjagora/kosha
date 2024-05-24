import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
      return (
            <div className="flex h-full pb-24">
                  {children}
                  <div className="flex-1">

                  </div>
            </div>
      )
}

export default Layout;