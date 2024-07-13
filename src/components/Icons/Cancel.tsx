import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgCancel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <circle
      cx={8.778}
      cy={8.778}
      r={6.207}
      fill="#CD1A1A"
      transform="rotate(-45 8.778 8.778)"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m7.182 7.182 3.192 3.192M7.182 10.374l3.192-3.192"
    />
  </svg>
);
const Memo = memo(SvgCancel);
export default Memo;
