import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 101 102"
    {...props}
  >
    <circle cx={50.519} cy={51.319} r={50.375} fill="red" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M33.4 38.9h35.2m-24.2-6.6h13.2m-11 28.6V47.7m8.8 13.2V47.7m3.3 22H43.3a4.4 4.4 0 0 1-4.4-4.4L37.895 41.19a2.2 2.2 0 0 1 2.198-2.291h21.813a2.2 2.2 0 0 1 2.198 2.291L63.1 65.3a4.4 4.4 0 0 1-4.4 4.4"
    />
  </svg>
);
const Memo = memo(SvgTrash);
export default Memo;
