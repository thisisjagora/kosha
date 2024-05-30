import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 101 102"
    {...props}
  >
    <circle cx={50.519} cy={51.319} r={50.375} fill="#27446E" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m30.13 53.118 11.994 12.594 29.985-28.786"
    />
  </svg>
);
const Memo = memo(SvgCheck);
export default Memo;
