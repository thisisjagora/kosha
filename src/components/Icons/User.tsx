import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface Props extends SVGProps<SVGSVGElement>{
  invertColor?: boolean
}
const SvgUser: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <ellipse
      cx={12.5}
      cy={17.5}
      stroke={props.invertColor? "#ffffff" : "#A3AED0"}
      strokeLinejoin="round"
      strokeWidth={1.5}
      rx={7}
      ry={3.5}
    />
    <circle
      cx={12.5}
      cy={7}
      r={4}
      stroke={props.invertColor? "#ffffff" : "#A3AED0"}
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);
const Memo = memo(SvgUser);
export default Memo;
