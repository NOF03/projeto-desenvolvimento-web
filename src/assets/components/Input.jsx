import React from "react";


export default function Input(props) {
    return (
        <>

            <div {...props} className="">
                {props.image}
                <input type={props.type} id={props.id} placeholder={props.placeholder} className='inputText py-2 px-3 my-4' required /><br />
            </div>

            <style>
                {
                    `
                .inputText {
                    color: white;
                    font-size: 20px;
                    background-color: transparent;
                    border-color: white;
                    border-width: 0px;
                    border-bottom-width: 2px;
                  }
                
                input:focus {
                    outline: 0px;
                }
                
                ::placeholder {
                    color: white;
                    opacity: 1;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                }

                `
                }
            </style>
        </>
    )
}