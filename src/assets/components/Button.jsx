import React from "react";

export default function Button(props) {
  return (
    <>
      <button
        type="submit"
        className="rounded w-[330px] font-extrabold text-[#1B48E9] hover:opacity-90 bg-white my-2 h-12"
        {...props}
      >
        {props.value}
      </button>
    </>
  );
}
