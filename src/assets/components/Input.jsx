import React from "react";

export default function Input(props) {
  return (
    <>
      <div className="flex items-center py-2">
        {props.image}
        <input
          {...props}
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          className=" font-bold text-xl w-full py-2 px-3 my-4 text-white bg-transparent border-b-2 focus:outline-0 placeholder:text-white "
          required
        />
        <br />
      </div>
    </>
  );
}
