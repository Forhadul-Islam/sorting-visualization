import React, { useEffect, useState } from 'react'
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SortingVisualizer = () => {
    const [numbers, setNumbers] = useState([])
    const [isSorting, setIsSorting] =useState(false)
    
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const resetArray = () => {
        const array = [];
        for(let i = 0; i<210; i++){
            array.push(getRandomArbitrary(5, 600))
        }
        setNumbers(array)
    }

    useEffect(()=>{
        resetArray()
    }, [])

    const mergeSort =() => {
        const animations = getMergeSortAnimations(numbers);
        console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        // setTimeout(() => {
        //   barOneStyle.backgroundColor = color;
        //   barTwoStyle.backgroundColor = color;
        // }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }  
    }
    const quickSort =() =>{

    }
    const heapSort =() =>{

    }
    const bubbleSort =() =>{

    }

    return (
        <div className="sortingVisualizer">
            <div className="array-container">
            {
                numbers.map((value, index) =>{
                   return <div style={{height:`${value}px`}} className="array-bar"></div>
                })
            }
            </div>
            
            <div className="sortingVisualizer__controller">
                <button className="barGenerateButton" disabled={isSorting} onClick={() => resetArray()}>Generate New Array</button>
                <button className="mainButton" disabled={isSorting} onClick={() => mergeSort()}>Merge Sort</button>
                <button className="mainButton" disabled={isSorting} onClick={() => quickSort()}>Quick Sort</button>
                <button className="mainButton" disabled={isSorting} onClick={() => heapSort()}>Heap Sort</button> 
                <button className="mainButton" disabled={isSorting} onClick={() => bubbleSort()}>Bubble Sort</button>
            </div>
            
        </div>
    )
}

export default SortingVisualizer
