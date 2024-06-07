import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgSend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 58 58"
    {...props}
  >
    <circle cx={29} cy={29} r={29} fill="#27446E" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M23.104 28.5H28.5m-15.416-3.084h3.083m-3.084 6.167h3.084m8.407-15.015 17.314 8.652c2.705 1.351 2.705 5.209 0 6.56l-17.314 8.652c-3.08 1.539-6.393-1.626-4.994-4.77l2.523-5.673a3.67 3.67 0 0 0 0-2.979l-2.523-5.672c-1.398-3.145 1.915-6.309 4.994-4.77Z"
    />
  </svg>
);
const Memo = memo(SvgSend);
export default Memo;
