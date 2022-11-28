import * as React from "react";
import { SVGProps } from "react";

export interface SvgLoaderProps extends SVGProps<SVGSVGElement> {
  color: string;
  size: number;
  margin?: string;
}

const Loader = (props: SvgLoaderProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: props.margin ? props.margin : "auto",
        background: "0 0",
        display: "block",
        shapeRendering: "auto",
      }}
      width={props.size}
      height={props.size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <circle
        cx={50}
        cy={50}
        fill="none"
        stroke={props.color ? props.color : "#29aaff"}
        strokeWidth={10}
        r={35}
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
};

export default Loader;
