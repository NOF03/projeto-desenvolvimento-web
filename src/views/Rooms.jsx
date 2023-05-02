import React from 'react';
import LogoTop from '../assets/components/LogoTop';

import CardRoom from '../assets/components/CardRoom'
export default function SplashScreen() {

    return (
        <>
            <LogoTop />
            <div className='py-5 text-center'>
                <h2>Rooms</h2>
            </div>
            <div className="container mx-auto py-32 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
                <CardRoom type="Entertainment" size={3}/>
                <CardRoom type="ArtCulture" size={3}/>
                <CardRoom type="Music" size={3}/>
                </div>
            </div>
            <div className='grid-cols-3 '>
                
            </div>
        </>

    );

};