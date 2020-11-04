import React, { useEffect, useState } from 'react'
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms';



const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const SortingVisualizer = () => {
    const [numbers, setNumbers] = useState([])
    const [isSorting, setIsSorting] =useState(false)
    const [primaryColor, setPrimaryColor] = useState('#6eb49a')
    
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
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR ;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
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
                   return <div style={{height:`${value}px` , backgroundColor:primaryColor}} className="array-bar"></div>
                })
            }
            </div>
            
            <div className="sortingVisualizer__controller">
                <div className="color-section">
                    <p>Color: </p>
                    <div style={{backgroundColor: "aqua"}} onClick={()=>setPrimaryColor('aqua')} className="colorOption"></div>
                    <div style={{backgroundColor: "#7f3cc9"}} onClick={()=>setPrimaryColor('#7f3cc9')} className="colorOption"></div>
                    <div style={{backgroundColor: "#b4a578"}} onClick={()=>setPrimaryColor('#b4a578')} className="colorOption"></div>
                    <div style={{backgroundColor: "#6eb49a"}} onClick={()=>setPrimaryColor('#6eb49a')} className="colorOption"></div>
                </div>
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
