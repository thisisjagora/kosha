import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgAlarm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx={16} cy={17.472} r={11.625} stroke="#B3B7B7" strokeWidth={1.5} />
    <path
      stroke="#B3B7B7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 12.305v5.167l3.23 3.229M5.02 6.493l5.167-3.23M26.98 6.493l-5.167-3.23"
    />
  </svg>
);
const Memo = memo(SvgAlarm);
export default Memo;
