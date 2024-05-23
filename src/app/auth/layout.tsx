import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
      return (
            <div className="flex h-full">
                  {children}
                  <div className="flex-1">

                  </div>
            </div>
      )
}

export default Layout;