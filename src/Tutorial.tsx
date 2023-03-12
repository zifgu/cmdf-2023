import React, {useState} from 'react';
import Spline from "@splinetool/react-spline";

export function Tutorial(){
    return (
    <div className='intro'>
        <p>We're glad you are with us today</p>
        <p>Would you like to learn how to play?</p>

        <div className='vertical-center'>
            <a href='/game'>
                    <button>Options</button>
            </a>
            <a href='/game'>
                    <button>Options</button>
            </a>
        </div>

    </div>
    );
}

export default Tutorial;