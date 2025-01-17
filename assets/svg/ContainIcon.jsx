import * as React from "react";
import Svg, { G, Polygon, Path } from "react-native-svg";

/* SVGR has dropped some elements not supported by react-native-svg: switch */
const ContainIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    fill={"#fff"}
    viewBox="0 5 98 12"
    style={{
      enableBackground: "new 0 0 98 98",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Path d="M83.435,11.966H14.565c-7.07,0-12.822,5.752-12.822,12.822v48.423c0,7.07,5.752,12.822,12.822,12.822h68.869  c7.07,0,12.822-5.752,12.822-12.822V24.788C96.257,17.718,90.505,11.966,83.435,11.966z M89.982,73.212  c0,3.61-2.937,6.547-6.547,6.547H14.565c-3.61,0-6.547-2.937-6.547-6.547V24.788c0-3.61,2.937-6.547,6.547-6.547h68.869  c3.61,0,6.547,2.937,6.547,6.547V73.212z M82.561,47.308c0.661,1.031,0.661,2.353,0,3.384l-6.688,10.442  c-0.599,0.935-1.611,1.446-2.645,1.446c-0.579,0-1.165-0.16-1.689-0.496c-1.459-0.935-1.884-2.875-0.95-4.334l3.595-5.612H23.816  l3.595,5.612c0.935,1.459,0.509,3.4-0.95,4.334c-0.524,0.336-1.11,0.496-1.689,0.496c-1.034,0-2.046-0.511-2.645-1.446  l-6.688-10.442c-0.661-1.031-0.661-2.353,0-3.384l6.688-10.442c0.934-1.459,2.875-1.884,4.334-0.95  c1.459,0.935,1.884,2.875,0.95,4.334l-3.595,5.612h50.369l-3.595-5.612c-0.935-1.459-0.509-3.4,0.95-4.334  c1.459-0.934,3.4-0.509,4.334,0.95L82.561,47.308z" />
  </Svg>
);
export default ContainIcon;
