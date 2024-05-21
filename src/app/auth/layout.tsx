import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
      return (
            <div className="flex">
                  {children}
                  <p>Auth pages</p>
            </div>
      )
}

export default Layout;