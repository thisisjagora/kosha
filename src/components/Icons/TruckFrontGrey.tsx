import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTruckFrontGrey = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#B2B7B7"
      fillRule="evenodd"
      d="M27.625 3.264V1.972c0-.713-.579-1.292-1.292-1.292H5.667c-.713 0-1.292.579-1.292 1.292v1.292z"
      clipRule="evenodd"
    />
    <path
      fill="#B2B7B7"
      d="M.5 9.722h2.583v5.167H.5zM28.917 9.722H31.5v5.167h-2.583z"
    />
    <path
      fill="#B2B7B7"
      fillRule="evenodd"
      d="m29.83 17.85-2.205-2.205V5.847H4.375v9.798L2.17 17.85a1.3 1.3 0 0 0-.378.913v7.75c0 .713.579 1.292 1.292 1.292h25.833c.713 0 1.292-.579 1.292-1.292v-7.75c0-.342-.136-.671-.379-.913M6.96 8.43h18.083v6.458H6.959zm0 15.5a1.292 1.292 0 1 1 0-2.584 1.292 1.292 0 0 1 0 2.584m18.083 0a1.292 1.292 0 1 1 .001-2.584 1.292 1.292 0 0 1-.001 2.584M4.375 29.097v1.291c0 .713.577 1.292 1.292 1.292h3.875c.714 0 1.291-.579 1.291-1.292v-1.291zM21.167 29.097v1.291c0 .713.577 1.292 1.292 1.292h3.875c.714 0 1.291-.579 1.291-1.292v-1.291z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgTruckFrontGrey);
export default Memo;
