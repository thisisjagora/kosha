import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const H: FC<HeadingProps> = ({ level = 2, ...rest }) => {
  const TagName = `h${level}` as keyof JSX.IntrinsicElements;

  return <TagName {...(rest as any)} className={cn("font-dm-sans font-bold antialiased tracking-[-2%] leading-[42px]", rest.className)} />;
};

export const P: FC<HTMLAttributes<HTMLParagraphElement>> = ({ ...rest }) => <p {...(rest as any)} className={cn("font-source-sans antialiased text-base font-medium", rest.className)} />