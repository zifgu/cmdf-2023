import React, {useState} from 'react';
import Spline from "@splinetool/react-spline";
import './Tutorial.css';

export function Tutorial_3(){
    return (
    <div className='intro'>
        <p>"Reframing" is a proven method to help</p>
        <p>with stress & anxiety by changing your</p>
        <p>perspective on a situation to view it in a</p>
        <p>more positive or helpful way.</p>

        <div className='vertical-center'>
            <a href='/Tutorial_2'>
                    <button className='tutorial-button'>how do i do that?</button>
            </a>
        </div>
        {/* <div className='background-img'>
            <img id="pig" src="background.png" width="120%" />
        </div> */}
    </div>
    );
}

export default Tutorial_3;