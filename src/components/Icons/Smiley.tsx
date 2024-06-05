import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgSmiley = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 33 33"
    {...props}
  >
    <path
      stroke="#616161"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.039}
      d="M16.312 28.546c6.756 0 12.234-5.477 12.234-12.234S23.069 4.078 16.312 4.078 4.078 9.555 4.078 16.312s5.477 12.234 12.234 12.234"
    />
    <path
      fill="#616161"
      d="M11.724 15.292a1.53 1.53 0 1 0 0-3.058 1.53 1.53 0 0 0 0 3.058M20.9 15.292a1.53 1.53 0 1 0 0-3.058 1.53 1.53 0 0 0 0 3.058"
    />
    <path
      stroke="#616161"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.039}
      d="M21.613 19.37a6.13 6.13 0 0 1-10.603 0"
    />
  </svg>
);
const Memo = memo(SvgSmiley);
export default Memo;
