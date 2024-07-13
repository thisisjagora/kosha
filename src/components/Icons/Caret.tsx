import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgCaret = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#A3AED0"
      d="M14.71 8.12 10.83 12l3.88 3.88a.996.996 0 1 1-1.41 1.41L8.71 12.7a.996.996 0 0 1 0-1.41L13.3 6.7a.996.996 0 0 1 1.41 0c.38.39.39 1.03 0 1.42"
    />
  </svg>
);
const Memo = memo(SvgCaret);
export default Memo;
