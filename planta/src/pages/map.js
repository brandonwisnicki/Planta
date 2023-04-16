import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import styles from "@/styles/Map.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Page() {

  const colors = ['#FF0000', '#00FF00', '#0000FF'];
  const [plants, setPlants] = useState(null);
  const [currentXMap, setXMap] = useLocalStorage("currentXMap", 2);
  const [currentYMap, setYMap] = useLocalStorage("currentYMap", 2);

  const [entireGarden, setEntireGarden] = useLocalStorage("entireGarden", [
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],

  ]);

  const [idLayout, setIdLayout] = useLocalStorage("gardenId", [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1,  -1],
    [-1, -1, 0, -1,  -1],
    [-1, -1, -1, -1,  -1],
    [-1, -1, -1, -1,  -1],
  ])

  const [key, setKey] = useState({});

  let mapClick = (e) => {
    // console.log(e.target.getBoundingClientRect());
    let y = (e.clientY - e.target.getBoundingClientRect().top) / e.target.getBoundingClientRect().height;
    let x = (e.clientX - e.target.getBoundingClientRect().left) / e.target.getBoundingClientRect().width;
    x*=5;
    y*=5;
    x = Math.floor(x);
    y = Math.floor(y);

    if(idLayout[y][x] !== -1){
      setXMap(x);
      setYMap(y);
    }
  }


  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch("/api/data");
      const data = await res.json();
      setPlants(data['plants']);
    }

    fetchData();




  }, [])


  useEffect(() => {

    let s = window.innerWidth;
    let sectionWidth = 8;
    let sectionHeight = 8;

    let unit = s/40;

    let setRect = (x, y, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * unit, y  * unit, unit+.5, unit+.5);
    }
    const plantMap = {};



    let c = document.getElementById("map");
    let ctx = c.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerWidth;
    if(idLayout && plants){

      for(let sectionY = 0; sectionY < idLayout.length; sectionY++){
        for(let sectionX = 0; sectionX < idLayout[sectionY].length; sectionX++){



          if(idLayout[sectionY][sectionX] === -1){
          for(let y = 0; y < 8; y++){
            for(let x = 0; x < 8; x++){
              setRect(sectionX * 8 + x, sectionY * 8 + y, '#b9b9b9');
            }
          }
        } else {
          for(let y = 0; y < 8; y++){
            for(let x = 0; x < 8; x++){
          
              let p = plants[entireGarden[idLayout[sectionY][sectionX]][y][x]];
              if(p.name !== "Empty"){
                plantMap[p.name] = p.color;
              }
              setRect(sectionX * sectionWidth + x, sectionY * sectionHeight + y, p.color);
            }
          }
        }
        
        ctx.strokeStyle = "#e9e9e9"
        ctx.strokeRect(sectionX * unit*sectionWidth, sectionY * unit*sectionHeight, unit*sectionWidth, unit*sectionHeight)

        ctx.strokeStyle = "#00aaff"
        ctx.strokeRect(currentXMap * unit*sectionWidth, currentYMap * unit*sectionHeight, unit*sectionWidth, unit*sectionHeight)

      }
    }
  }
  setKey(plantMap);
  }, [plants, entireGarden, idLayout, currentXMap, currentYMap]);
  
    return <> 
<div className={styles.pageCtner}>
      <canvas
          onClick={e=>mapClick(e)}
          id="map"
          
          style={{ border: "2px solid #d3d3d3" }}
        >
          Your browser does not support the HTML canvas tag.
        </canvas>

      <div className={styles.ctrlContainer}>
        <h3>Selected: ({currentXMap}, {currentYMap})</h3>
        <Link href="/garden" className={styles.goToSelectionBtn}>Go to Selected
        <FontAwesomeIcon icon={faArrowRight}/></Link>

        
      </div>

      <div className={styles.keyOuterContainer}>
        <div className={styles.keyInnerContainer}>
          
        <h2 className={styles.keyTitle}>Key</h2>
       
       <ul className={styles.keyList}>
        {
          Object.keys(key).map((k) => {
            return <li 
            className={styles.keyItem}
            style={{color: key[k]}}
            >
              <div className={styles.keySquare} style={{backgroundColor: key[k]}}>
                
                </div>{k}</li>    
          })
        }
        </ul>
        </div>
      </div>
      </div>
      </>
  }
  