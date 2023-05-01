import React from 'react';

export default function Logo(props) {
    return (
        <svg height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M100 175V75H50V125L100 175Z" fill="white" fillOpacity="0.5" />
            <path d="M150 75V25H50L100 75H50V125H150L100 75H150Z" fill="white" />
        </svg>

    )
}