
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
        grid: [[2,1,2,1,2,1,2,7],[1,2,1,2,1,2,7,7],[2,1,2,1,2,7,7,2],[1,2,1,2,7,7,2,1],[2,1,2,7,7,2,1,2],[1,2,7,7,2,1,2,1],[2,7,7,2,1,2,1,2],[7,7,2,1,2,1,2,1]],
        palette: [1,2,7]
    },
    {
        name: "Feeling Blue",
        image: "temp.png",
        grid: [],
        palette: []
    },
    {
        name: "Vegetables Galor",
        image: "temp.png",
        grid: [],
        palette: []
    },
    {
        name: "Roses of Love",
        image: "temp.png",
        grid: [],
        palette: []
    },
    {
        name: "Arizona Garden",
        image: "temp.png",
        grid: [],
        palette: []
    },
    {
        name: "Happy Carrots",
        image: "temp.png",
        grid: [],
        palette: []
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