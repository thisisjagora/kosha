import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 29 28"
    {...props}
  >
    <path
      fill="#27446E"
      fillRule="evenodd"
      d="M14.5 27.5c7.594 0 13.75-6.156 13.75-13.75S22.094 0 14.5 0 .75 6.156.75 13.75 6.906 27.5 14.5 27.5m1.031-17.875a1.031 1.031 0 1 0-2.062 0v3.094h-3.094a1.031 1.031 0 1 0 0 2.062h3.094v3.094a1.031 1.031 0 0 0 2.062 0v-3.094h3.094a1.031 1.031 0 0 0 0-2.062h-3.094z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgAdd);
export default Memo;
