import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/PaletteChooser.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft, faInfoCircle, faCirclePlus, faXmarkCircle, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import {useLocalStorage} from '../../hooks/useLocalStorage';
import { Router } from 'next/router';

export default function PaletteChooser() {


    
    

    const [plants, setPlants] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [palette, setPalette] = useLocalStorage("palette", [1,2,3]);

    const [timestamp, setTimestamp] = useState(new Date());


    const [experiment, setExperiment] = useLocalStorage("experiment", "paint"); // paint or plant

    useEffect(() => {

    
        const fetchData = async () => {
          const res = await fetch("/api/data");
          const data = await res.json();
          setPlants(data['plants'].sort(function(a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
          
            return (a < b) ? -1 : (a > b) ? 1 : 0;
          }));
        }
        fetchData();
        
      }, [])

      const searchUpdate = e => {
        setSearchTerm(e.target.value);
      }

      const removeFromPalette = (id) => {
            let temp = palette;
            temp = temp.filter((e) => id !== e);
            setPalette(temp);
            setTimestamp(new Date());
      }

      const addToPalette = (id) => {
            let temp = palette;
            if(!temp.includes(id)){
                temp.push(id);
                setPalette(temp);
                setTimestamp(new Date());
            }
          
      }
    

    return <>
    <div className={styles.header}>

        <div  className={styles.headerTitle}>
        <Link href="/garden">
        <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} />
        </Link>
        <h1>Add Plant</h1>
        </div>
        <div className={styles.searchContainer}>
            <input onChange={searchUpdate} className={styles.search} placeholder="Search..."/>
            <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
        </div>
    </div>
    <p className={styles.desc}>Explore all different kinds of plants and add a plant to your garden {experiment === "paint" ? "palette": "seed box"}. Adding a plant allows you to put it in your garden design. </p>
    

    <ul className={styles.list}>

      {plants.map((p, idx) => {
          
          if(idx < 1 || !p.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return <></>
          }

        return <> <li key={p.id} className={styles.listItem}>
              {p.name} 

            <div>
          <Link href={`/garden/${p.id}`}>  <FontAwesomeIcon className={styles.listIcon} icon={faInfoCircle} />
          </Link>
              {(!palette.includes(p.id) && timestamp) ? <FontAwesomeIcon onClick={() => addToPalette(p.id)} className={styles.listIcon} icon={faCirclePlus} />
                :
              <FontAwesomeIcon onClick={() => removeFromPalette(p.id)} className={styles.listXIcon} icon={faXmarkCircle} />
                }
            </div>

          </li>
          </>
      })}

    </ul>

    </>

}