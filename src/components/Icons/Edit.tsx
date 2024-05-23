import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  invertColor?: boolean;
}
const SvgEdit:React.FC<Props> = ({invertColor, ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <g clipPath="url(#edit_svg__a)">
      <path
        fill={invertColor? "#FFFFFF" : "#8F9BBA"}
        d="M2.25 13.095v2.28c0 .21.165.375.375.375h2.28a.35.35 0 0 0 .263-.113l8.19-8.182-2.813-2.813-8.183 8.183a.37.37 0 0 0-.112.27M15.533 5.28a.747.747 0 0 0 0-1.058l-1.755-1.755a.747.747 0 0 0-1.058 0L11.347 3.84l2.813 2.812z"
      />
    </g>
    <defs>
      <clipPath id="edit_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgEdit);
export default Memo;
