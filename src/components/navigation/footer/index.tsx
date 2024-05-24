import { P } from "@/components/atoms"
import { Routes } from "@/core/routing"
import Link from "next/link"

export const Footer = () => {
      return (
            <footer className="flex gap-2 justify-between items-center w-full pb-4 pt-12">
                  <P className="text-grey-200">© 2024 KoshaMoves All Rights Reserved.</P>

                  <div className="flex gap-8">
                        <Link href={Routes.license}>
                              <P className="text-grey-200 hover:text-black transition-colors duration-300 ease-linear">License</P>
                        </Link>
                        <Link href={Routes.terms}>
                              <P className="text-grey-200 hover:text-black transition-colors duration-300 ease-linear">Terms of Use</P>
                        </Link>
                  </div>
            </footer>
      )
}