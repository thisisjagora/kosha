import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgInfoCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 12v4.8m0-8.358V8.4M2.4 12a9.6 9.6 0 1 1 19.2 0 9.6 9.6 0 0 1-19.2 0"
    />
  </svg>
);
const Memo = memo(SvgInfoCircle);
export default Memo;
