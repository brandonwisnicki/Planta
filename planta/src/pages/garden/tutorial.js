
import styles from '@/styles/Tutorial.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft, faInfoCircle, faCirclePlus, faXmarkCircle, faMagnifyingGlass, faDotCircle, faListDots, faCircle, faCircleHalfStroke, faChevronRight, faTree, faSeedling } from "@fortawesome/free-solid-svg-icons";

import {useLocalStorage} from '../../hooks/useLocalStorage';

import { useSwipeable } from 'react-swipeable';

export default function Tutorial () {


    const [currentSlide, setSlide] = useState(0);

    const slides = [

        {
            image: "1.png",
            text: "This is your garden layout. Each grid is a place where you can put any kind of plant. Think of this as your canvas, and think of yourself as Van Gogh!"
        },
        {
            image: "2.png",
            text: "...and perfect! What a masterpiece. This tool will help plan out exactly how you want your garden to look."
        },
        {
            image: "3.png",
            text: "You have lots of tools to help you design your garden exactly as you'd like it. All you have to do is tap on the right tool and a plant from your palette. You can add all sorts of different plants to your palette with the + icon."
        },
        {
            image: "3.png",
            text: "Looks like you're ready to start designing the perfect garden! Would you like to get start with a premade garden template or start from scratch?",
            offboardingControls: true,
        }


    ]

    const plantSlides = [
        {
            image: "1.png",
            text: "This is your garden layout. Each grid is a place where you can put any kind of plant. This will help you design large, beautiful gardens"
        },
        {
            image: "2.png",
            text: "...and perfect! What a a beautiful garden. This tool will help plan out exactly how you want your garden to look."
        },
        {
            image: "3plant.png",
            text: "You have lots of gardening tools to help you design your garden exactly as you'd like it. All you have to do is tap on a tool and a plant from your seed box. You can add all sorts of different plants to your seed box with the + icon."
        },
        {
            image: "3plant.png",
            text: "Looks like you're ready to start designing the perfect garden! Would you like to get start with a premade garden template or start from scratch?",
            offboardingControls: true,
        }
    ]

    const [experiment, setExperiment] = useLocalStorage("experiment", "paint"); // paint or plant


    const advance = () => {
        if(currentSlide < slides.length-1){
            setSlide(prev => prev+1);
        }
    }

    const back = () => {
        if(currentSlide > 0){
            setSlide(prev => prev-1);
        }
    }

    
    const handlers = useSwipeable({
        onSwipedLeft: advance,
        onSwipedRight: back
      });

    return <>

    <div className={styles.header}>
        <h1> Welcome to your Garden!</h1>
        <p>Let's get you started</p>
    </div>
    <div className ={styles.tutorialBody} {...handlers}>

    <img 
    className={styles.tutorialImage}
    src={`/tutorial_images/${experiment === "paint" ?  slides[currentSlide].image : plantSlides[currentSlide].image}`}/>

    <div className={styles.tutorialCaption}>
        <p>{experiment === "paint" ? slides[currentSlide].text : plantSlides[currentSlide].text}</p>
    </div>

{slides[currentSlide].offboardingControls && <div className={styles.btnContainer}>

    <Link href="/garden/templates" className={styles.endBtns}>

        <FontAwesomeIcon icon={faTree}/>
        Template
    </Link>

    <Link href="/garden" className={styles.endBtns}>
        <FontAwesomeIcon icon={faSeedling}/>
        Scratch
    </Link>
</div>}
    <div className={styles.footerContainer}>
    <div className={styles.footerInnerContainer}>

    
<FontAwesomeIcon className={styles.directionalIcon + " " + (currentSlide <= 0 && styles.hiddenBtn)} 
onClick={back}
icon={faChevronLeft}/>
    <div className={styles.dotContainer}>
        {
            slides.map((s, idx) =>{
                if(idx === currentSlide) {
                    return <FontAwesomeIcon className={styles.currentDot} icon={faCircle} />
                } else {
                    return <FontAwesomeIcon className={styles.inactiveDot} icon={faCircle} />
                }
            })
        }
    </div>

    <FontAwesomeIcon className={styles.directionalIcon + " " + (currentSlide >= slides.length-1 && styles.hiddenBtn)}
    
    onClick={advance}
    
    icon={faChevronRight}/>
    </div>

        </div>
    </div>
    </>
}