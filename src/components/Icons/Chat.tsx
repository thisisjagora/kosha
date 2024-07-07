import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface Props extends SVGProps<SVGSVGElement>{
  invertcolor?: boolean
}
const SvgChat: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 21 19"
    {...props}
  >
    <path
      fill={props.invertcolor? "#FFFFFF" : "#A3AED0"}
      fillRule="evenodd"
      d="M9.5 1.75a7.25 7.25 0 0 0-5.576 11.885.75.75 0 0 1 .139.706l-.738 2.33 3.003-.946a.75.75 0 0 1 .502.018 7.2 7.2 0 0 0 2.67.507h2a7.25 7.25 0 1 0 0-14.5zM.75 9A8.75 8.75 0 0 1 9.5.25h2a8.75 8.75 0 1 1 0 17.5h-2a8.7 8.7 0 0 1-2.969-.517l-3.215 1.013a1.25 1.25 0 0 1-1.567-1.57l.49.155-.49-.155.764-2.408A8.7 8.7 0 0 1 .75 9"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgChat);
export default Memo;
