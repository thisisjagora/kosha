import { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ ...props }) => <div {...props} className="w-full h-full flex flex-col items-center justify-center" />

export default Layout;