import { QuoteDetailsProvider } from "@/contexts/QuoteDetails.context";
import { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ ...props }) => <QuoteDetailsProvider><div {...props} className="w-full h-full flex flex-col items-center justify-start" /></QuoteDetailsProvider>

export default Layout;