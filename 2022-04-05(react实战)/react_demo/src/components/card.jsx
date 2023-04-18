import React from "react";

export default function Card(props) {
  return (
    <div className={"flex-shrink-0 bt-white border m-2 border-gray-200 rounded-sm shadow-md " + props.className}>
      {props.children}
    </div>
  )
} 