import { ChatList } from "@/components/messaging";
import { FC, PropsWithChildren } from "react"

const Layout:FC<PropsWithChildren> = ({ children }) => {
      return (
            <div className="flex h-full">
                  <div className="flex-1 max-w-[320px]">
                        <ChatList />
                  </div>
                  <div className="flex-1 bg-white-100">
                        {children}
                  </div>
            </div>
      )
}

export default Layout;