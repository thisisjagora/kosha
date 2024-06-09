import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTruckFront = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      fill="#6A6A6A"
      fillRule="evenodd"
      d="M12.25 1.167V.583A.584.584 0 0 0 11.667 0H2.333a.584.584 0 0 0-.583.583v.584z"
      clipRule="evenodd"
    />
    <path
      fill="#6A6A6A"
      d="M0 4.083h1.167v2.333H0zM12.833 4.083H14v2.333h-1.167z"
    />
    <path
      fill="#6A6A6A"
      fillRule="evenodd"
      d="m13.246 7.754-.996-.996V2.333H1.75v4.425l-.996.996a.58.58 0 0 0-.17.412v3.5c0 .322.26.583.583.583h11.666a.583.583 0 0 0 .584-.583v-3.5a.58.58 0 0 0-.171-.412M2.916 3.5h8.168v2.917H2.917zm0 7a.584.584 0 1 1 .001-1.168.584.584 0 0 1 0 1.167m8.168 0a.583.583 0 1 1 0-1.167.583.583 0 0 1 0 1.166M1.75 12.833v.583c0 .322.26.584.583.584h1.75a.583.583 0 0 0 .584-.584v-.583zM9.333 12.833v.583c0 .322.261.584.584.584h1.75a.583.583 0 0 0 .583-.584v-.583z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgTruckFront);
export default Memo;
