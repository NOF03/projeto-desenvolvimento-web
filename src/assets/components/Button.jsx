import React from "react";

export default function Button(props) {
    return (
        <>
            <input type="submit" value={props.value} className="btn btn-lg buttonPrimary my-2" />

            <style>
                {
                    `
                        .buttonPrimary {
                            background-color: white;
                            color: #1B48E9;
                            font-weight: 800;
                            width: 320px;
                        }

                        .buttonPrimary:hover {
                            background-color: white;
                            color: #1B48E9;
                            font-weight: 800;
                            opacity: 0.9
                        }
                    `
                }
            </style>
        </>
    )
}