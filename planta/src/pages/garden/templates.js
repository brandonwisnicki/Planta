
import styles from '@/styles/Templates.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft, faInfoCircle, faCirclePlus, faXmarkCircle, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import {useLocalStorage} from '../../hooks/useLocalStorage';

export default function Templates() {

const templates = [
    {
        name: "Flower Paradise",
        image: "flowerparadise.png",
        grid: [[1,1,8,8,2,2,7,7],[1,8,8,2,2,7,7,7],[8,8,2,2,7,7,7,2],[8,2,2,7,7,7,2,2],[2,2,7,7,7,2,2,8],[2,7,7,7,2,2,8,8],[7,7,7,2,2,8,8,1],[7,7,2,2,8,8,1,1]],
        palette: [1,2,8,7]
    },
    {
        name: "Feeling Blue",
        image: "feelingblue.png",
        grid: [[2,2,2,7,7,2,2,2],[2,2,2,7,7,2,2,2],[2,2,7,7,7,7,2,2],[7,7,7,10,10,7,7,7],[7,7,7,10,10,7,7,7],[2,2,7,7,7,7,2,2],[2,2,2,7,7,2,2,2],[2,2,2,7,7,2,2,2]],
        palette: [2,7,10]
    },
    {
        name: "Vegetables Galor",
        image: "vegetablesgalore.png",
        grid: [[4,4,4,7,7,5,5,5],[4,10,4,7,7,5,10,5],[4,10,4,7,7,5,10,5],[4,4,4,7,7,5,5,5],[4,4,4,7,7,5,5,5],[4,10,4,7,7,5,10,5],[4,10,4,7,7,5,10,5],[4,4,4,7,7,5,5,5]],
        palette: [4,5,7,10]
    },
    {
        name: "Love Garden",
        image: "lovegarden.png",
        grid: [[7,7,7,7,7,7,7,7],[7,1,1,7,1,1,1,7],[7,1,7,7,1,3,1,7],[7,7,7,10,10,1,1,7],[7,1,1,10,10,7,7,7],[7,1,3,1,7,7,1,7],[7,1,1,1,7,1,1,7],[7,7,7,7,7,7,7,7]],
        palette: [1,3,7,10]
    },
    {
        name: "Arizona Garden",
        image: "arizona.png",
        grid:[[5,5,5,7,7,8,8,8],[5,5,5,7,7,8,9,8],[8,8,8,7,7,8,9,8],[8,9,8,7,7,8,9,8],[8,9,8,7,7,8,9,8],[8,9,8,7,7,8,8,8],[8,9,8,7,7,5,5,5],[8,8,8,7,7,5,5,5]],
        palette: [5,7,8,9]
    },
    {
        name: "Fruits and Veggies",
        image: "fruitsandveggies.png",
        grid: [[4,4,4,4,7,4,4,4],[4,6,6,6,7,3,3,4],[4,6,6,6,7,3,3,4],[7,7,7,7,7,3,3,4],[4,3,3,7,7,7,7,7],[4,3,3,7,6,6,6,4],[4,3,3,7,6,6,6,4],[4,4,4,7,4,4,4,4]],
        palette: [3,4,6,7]
    },
]


const router = useRouter();

  const [palette, setPalette] = useLocalStorage("palette", [1,2,3]);

  const [gardenGrid, setGardenGrid] = useLocalStorage("grid", [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]]);
  const [currentId, setCurrentId] = useLocalStorage("currplant", 1);


const selectTemplate = (t) => {
    setPalette(t.palette);
    setGardenGrid(t.grid);
    setCurrentId(t.palette[0]);
    router.push('/garden')
}

    return <>

<div className={styles.header}>

<div className={styles.headerTitle}>
  <Link href="/garden">
    <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} />
  </Link>
  <h1>Templates</h1>

</div>

</div>

<div className={styles.templateContainer}>
{templates.map(t => {
    return <div onClick={() => selectTemplate(t)} className={styles.template}>

        <img src={`/template_images/${t.image}`}/>
        <p>{t.name}</p>

    </div>
})}
</div>

</>
}