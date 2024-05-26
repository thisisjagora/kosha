import { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ children }) => {
      return (
            <div className="w-full h-full flex justify-center">
                  <div className="flex-1 h-full max-w-[900px]">
                        {children}
                  </div>
            </div>
      )
}

export default Layout;