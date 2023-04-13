import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import styles from "@/styles/Map.module.css"

export default function Page() {

  const colors = ['#FF0000', '#00FF00', '#0000FF'];
  const [plants, setPlants] = useState(null);


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
      ctx.fillRect(x * unit, y  * unit, unit, unit);
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
        
        ctx.strokeStyle = "#ffffff"
        ctx.strokeRect(sectionX * unit*sectionWidth, sectionY * unit*sectionHeight, unit*sectionWidth, unit*sectionHeight)

      }
    }
  }
  setKey(plantMap);
  }, [plants, entireGarden, idLayout]);
  
    return <> <h1 style={{
      textAlign: 'center',
      margin: 0
    }}>Satellite View</h1>

      <canvas
          id="map"
          
          style={{ border: "2px solid #d3d3d3" }}
        >
          Your browser does not support the HTML canvas tag.
        </canvas>

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
      </>
  }
  