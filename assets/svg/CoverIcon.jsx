import * as React from "react";
import Svg, { G, Path, Text } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 24"
    fill={"#fff"}
    x="0px"
    y="0px"
    {...props}
  >
    <Path
      d="M5 12C4.44771 12 4 11.5523 4 11L4 5C4 4.44771 4.44772 4 5 4L11 4C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6L6 6L6 11C6 11.5523 5.55228 12 5 12Z"
      fill={"#fff"}
    />
    <Path
      d="M28 13C28 12.4477 27.5523 12 27 12C26.4477 12 26 12.4477 26 13V18H21C20.4477 18 20 18.4477 20 19C20 19.5523 20.4477 20 21 20H27C27.5523 20 28 19.5523 28 19V13Z"
      fill={"#fff"}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 21C0 22.6569 1.34315 24 3 24H29C30.6569 24 32 22.6569 32 21V3C32 1.34315 30.6569 0 29 0H3C1.34315 0 0 1.34315 0 3V21ZM3 22C2.44771 22 2 21.5523 2 21V3C2 2.44772 2.44772 2 3 2H29C29.5523 2 30 2.44772 30 3V21C30 21.5523 29.5523 22 29 22H3Z"
      fill="#fff"
    />
  </Svg>
);
export default SVGComponent;
