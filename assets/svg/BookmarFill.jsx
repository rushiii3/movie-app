import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BookmarkFill = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
    />
  </Svg>
);
export default BookmarkFill;