import React from 'react';
import * as sortingAlgos from '../sorting-algos/sortingAlgos';
import './SortingVisualiser.css';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 300;
const PRIMARY_COLOR = 'blueviolet';
const SECONDARY_COLOR = 'green';

export default class SortingVisualiser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 1; i < NUMBER_OF_ARRAY_BARS + 1; i++) {
            array.push(i);
            shuffle(array);
        }
        this.setState({array});
    }

    randomArray() {
        const array = [];
        for (let i = 1; i < NUMBER_OF_ARRAY_BARS + 1; i++) {
            array.push(randomIntFromInterval(1, 300));
        }
        this.setState({array});
    }


    mergeSort() {
        const animations = sortingAlgos.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
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

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    render() {
        const {array} = this.state;
        return (
            <div>
                <div class="flex justify-evenly container mx-auto bg-gray-100 px-8 shadow-md rounded-full">
                    <div class="inline-block pt-6 pb-6">
                        <button class="px-4 py-2 hover:shadow-md rounded-full focus:outline-none" onClick={() => this.resetArray()}>Randomise New Dataset</button>
                    </div>
                    <div class="inline-block pt-6 pb-6">
                        <button class="px-4 py-2 hover:shadow-md rounded-full focus:outline-none" onClick={() => this.mergeSort()}>Merge Sort</button>
                    </div>
                    <div class="inline-block pt-6 pb-6">
                        <button class="px-4 py-2 hover:shadow-md rounded-full focus:outline-none" onClick={() => this.quickSort()}>Quick Sort</button>
                    </div>
                    <div class="inline-block pt-6 pb-6">
                        <button class="px-4 py-2 hover:shadow-md rounded-full focus:outline-none" onClick={() => this.heapSort()}>Heap Sort</button>
                    </div>
                    <div class="inline-block pt-6 pb-6">
                        <button class="px-4 py-2 hover:shadow-md rounded-full focus:outline-none" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    </div>
                </div>

                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{height: `${value}px`}}></div>
                    ))}
                </div>
                
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}