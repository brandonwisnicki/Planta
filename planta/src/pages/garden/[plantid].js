import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/PlantInfo.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft, faDroplet, faLeaf, faSun, faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router'

export default function PlantInfo() {

  const router = useRouter();

  const [experiment, setExperiment] = useLocalStorage("experiment", "paint"); // paint or plant


  const [plant, setPlantData] = useState({
    id: 0,
    name: "",
    color: "#FFFFFF"
  });
  const [palette, setPalette] = useLocalStorage("palette", [1,2,3]);
  const removeFromPalette = () => {
        const id = parseInt(router.query.plantid);
         let temp = palette;
         temp = temp.filter((e) => id !== e);
         setPalette(temp);
   }

   const addToPalette = () => {
    const id = parseInt(router.query.plantid);
         let temp = palette;
         if(!temp.includes(id)){
             temp.push(id);
             setPalette(temp);
         }
       
   }
  useEffect(() => {


    

    const fetchData = async () => {
      const res = await fetch("/api/data");
      const data = await res.json();
      if(router.query.plantid){
      const p = data['plants'][router.query.plantid];
        setPlantData(p);

      }
    }

    fetchData();

  }, [router])


  return <>

    <div className={styles.header}>

      <div className={styles.headerTitle}>
        <Link href="/garden/palette-chooser">
          <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} />
        </Link>
        <h1>{plant.name}</h1>

      </div>

    </div>
    <img className={styles.image} src="/plant_images/rose.jpg" />

    <p className={styles.desc}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor purus non enim praesent. Sit amet risus nullam eget felis eget nunc. Ornare arcu odio ut sem nulla pharetra. Augue interdum velit euismod in. Blandit turpis cursus in hac habitasse platea. Quisque non tellus orci ac.
         </p>

    <div className={styles.statContainer}>
      <div className={styles.stat}>
        <FontAwesomeIcon className={styles.statIcon}
           icon={faDroplet} />

        <span>Requires daily watering</span>
      </div>
      <div className={styles.stat}>
      <FontAwesomeIcon className={styles.statIcon}
           icon={faSun} />

        <span>Great for your climate</span>

      </div>
      <div className={styles.stat}>

      <FontAwesomeIcon className={styles.statIcon}
           icon={faLeaf} />

        <span>Can last up to 3 years</span>

      </div>
    </div>

   {palette && !palette.includes(parseInt(router.query.plantid)) ?
     <div className={experiment === "paint" ? styles.addButtonPaint : styles.addButton} onClick={addToPalette}>
      <FontAwesomeIcon icon={faPlus} />
      <span>Add to {experiment === "paint" ? "Palette" : "Seed Box"}</span>
    </div>
:
<div className={experiment === "paint" ? styles.remButtonPaint : styles.remButton} onClick={removeFromPalette}>
      <FontAwesomeIcon icon={faXmark} />
      <span>Remove from {experiment === "paint" ? "Palette" : "Seed Box"}</span>
    </div>
} 

  </>

}