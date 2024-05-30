import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 39 39"
    {...props}
  >
    <g fill="#fff" clipPath="url(#camera_svg__a)">
      <path d="M19.5 24.7a5.2 5.2 0 1 0 0-10.4 5.2 5.2 0 0 0 0 10.4" />
      <path d="M14.625 3.25 11.651 6.5H6.5a3.26 3.26 0 0 0-3.25 3.25v19.5A3.26 3.26 0 0 0 6.5 32.5h26a3.26 3.26 0 0 0 3.25-3.25V9.75A3.26 3.26 0 0 0 32.5 6.5h-5.151l-2.974-3.25zM19.5 27.625a8.13 8.13 0 0 1-8.125-8.125 8.13 8.13 0 0 1 8.125-8.125 8.13 8.13 0 0 1 8.125 8.125 8.13 8.13 0 0 1-8.125 8.125" />
    </g>
    <defs>
      <clipPath id="camera_svg__a">
        <path fill="#fff" d="M0 0h39v39H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCamera);
export default Memo;
