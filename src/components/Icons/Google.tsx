import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgGoogle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#4285F4"
      d="M19.787 10.225c0-.658-.058-1.283-.158-1.892h-9.417v3.759h5.392c-.242 1.233-.95 2.275-2 2.983v2.5h3.217c1.883-1.742 2.966-4.308 2.966-7.35"
    />
    <path
      fill="#34A853"
      d="M10.213 20c2.7 0 4.958-.9 6.608-2.425l-3.217-2.5c-.9.6-2.041.967-3.391.967-2.609 0-4.817-1.759-5.609-4.134H1.288v2.575C2.929 17.75 6.304 20 10.213 20"
    />
    <path
      fill="#FBBC05"
      d="M4.604 11.908A5.8 5.8 0 0 1 4.287 10c0-.667.117-1.308.317-1.908V5.517H1.287a9.88 9.88 0 0 0 0 8.966z"
    />
    <path
      fill="#EA4335"
      d="M10.213 3.958c1.475 0 2.791.509 3.833 1.5l2.85-2.85C15.17.992 12.913 0 10.213 0 6.304 0 2.929 2.25 1.288 5.517l3.316 2.575c.792-2.375 3-4.134 5.609-4.134"
    />
  </svg>
);
const Memo = memo(SvgGoogle);
export default Memo;
