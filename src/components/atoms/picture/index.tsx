/* eslint-disable jsx-a11y/alt-text */
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image"
import { FC, HTMLAttributes } from "react";

interface Props {
      image: ImageProps;
      container: HTMLAttributes<HTMLDivElement>;
}
export const Picture: FC<Props> = ({image, container}) => {
      return (
            <div {...container} className={cn("relative w-[50px] h-[50px] flex justify-center items-center",container.className)}>
                  <Image {...image} fill className={cn("w-[100%] h-[100%] object-contain object-center", image.className)}  />
            </div>
      )
}