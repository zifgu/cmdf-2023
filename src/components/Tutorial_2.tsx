import React, {useState} from 'react';
import Spline from "@splinetool/react-spline";
import './Tutorial.css';

export function Tutorial_2(){
    return (
    <div className='intro'>
        <p>Reframing can be diffcult if you haven't</p>
        <p>done it before.</p>
        <p>The ZenZone is a place where we reframe</p>
        <p>your thoughts for you, along with letting</p>
        <p>you explore our calming space</p>

        <div className='vertical-center'>
            <a href='/tutorial_3'>
                    <button className='tutorial-button'>show me!</button>
            </a>
        </div>
        {/* <div className='background-img'>
            <img id="pig" src="background.png" width="120%" />
        </div> */}
    </div>
    );
}

export default Tutorial_2;