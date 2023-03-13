import React, {useState} from 'react';
import Spline from "@splinetool/react-spline";
import './Tutorial_1.css';

export function Tutorial_1(){
    return (
    <div className='intro'>
        <p>Everyone has negative thoughts, but</p>
        <p>when negative thinking becomes a</p>
        <p>habit, it can make life miserable</p>

        <div className='vertical-center'>
            <a href='/tutorial_3'>
                    <button className='tutorial-button'>what should I do?</button>
            </a>
        </div>
        {/* <div className='background-img'>
            <img id="pig" src="background.png" width="120%" />
        </div> */}
    </div>
    );
}

export default Tutorial_1;