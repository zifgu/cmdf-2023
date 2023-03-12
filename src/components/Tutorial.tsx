import React, {useState} from 'react';
import Spline from "@splinetool/react-spline";
import './Tutorial.css';

export function Tutorial(){
    return (
    <div className='intro'>
        <p>We're glad you are with us today</p>
        <p>Would you like to learn how to play?</p>

        <div className='vertical-center'>
            <a href='/tutorial_1'>
                    <button className='tutorial-button'>I'd appreciate the help</button>
            </a>
            <a href='/game'>
                    <button className='tutorial-button'>I'm familiar, let's get started</button>
            </a>
        </div>

    </div>
    );
}

export default Tutorial;