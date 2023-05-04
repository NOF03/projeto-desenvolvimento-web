import React from 'react';
import LogoTop from '../assets/components/LogoTop';

import { ReactComponent as ArtCulture } from '../assets/images/categories/artculture.svg';
import { ReactComponent as Entertainment } from '../assets/images/categories/entertainment.svg';
import { ReactComponent as Geography } from '../assets/images/categories/geography.svg';
import { ReactComponent as Music } from '../assets/images/categories/music.svg';
import { ReactComponent as Science } from '../assets/images/categories/science.svg';
import { ReactComponent as Sports } from '../assets/images/categories/sports.svg';


function OneCateg(props) {
    return (
        <div className='grid items-center justify-center text-center'>
            <button>
                {props.image}
                <p className='text-xl font-bold'>{props.label}</p>
            </button>
        </div>

    )
}

export default function Category() {

    return (
        <>
            <LogoTop />
            <div className='pt-20 pb-10 text-center'>
                <h2>Choose a Category</h2>
            </div>
            <div className="container mx-auto ">
                <div className="grid mx-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-16">
                    <OneCateg image={<Entertainment height="180px" />} label="Entertainment" />
                    <OneCateg image={<Science height="180px" />} label="Science" />
                    <OneCateg image={<Geography height="180px" />} label="Geography" />
                    <OneCateg image={<ArtCulture height="180px" />} label="Art & Culture" />
                    <OneCateg image={<Music height="180px" />} label="Music" />
                    <OneCateg image={<Sports height="180px" />} label="Sports" />
                </div>
            </div>
        </>

    );

};