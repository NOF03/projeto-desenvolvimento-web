import React from "react";

export default function Button(props) {
    return (
        <>
            <input
                type="submit"
                value={props.value}
                className="rounded w-full font-extrabold text-[#1B48E9] hover:opacity-90 bg-white my-2 h-10"
                {...props}
            />

        </>
    )
}