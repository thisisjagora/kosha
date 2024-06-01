import { FC, PropsWithChildren } from "react"

const Layout:FC<PropsWithChildren> = ({ children }) => {
      return (
            <div className="flex gap-6">
                  <p>Chat list</p>
                  <div className="border flex-1">
                        {children}
                  </div>
            </div>
      )
}

export default Layout;