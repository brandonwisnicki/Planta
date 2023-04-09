

import styles from '@/styles/Garden.module.css'
import { useState, useEffect } from 'react';
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSeedling, faPaintBrush, faObjectGroup, faFillDrip, faEraser, faXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {useLocalStorage} from '../hooks/useLocalStorage';

import CustomIcon from "../components/customicon";
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { faDiceSix } from '@fortawesome/free-solid-svg-icons';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';

export default function Garden() {


  const [plants, setPlants] = useState({});


  const [experiment, setExperiment] = useLocalStorage("experiment", "paint"); // paint or plant

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

  const [timestamp, setTimestamp] = useState(new Date());

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [currentTool, setCurrentTool] = useLocalStorage("tool", "paint");

  const [currentId, setCurrentId] = useLocalStorage("currplant", 1);


  const [selectX0, setSelectX0] = useState(-1);
  const [selectY0, setSelectY0] = useState(-1);
  const [selectX1, setSelectX1] = useState(-1);
  const [selectY1, setSelectY1] = useState(-1);




  useEffect(() => {
   
    const fetchData = async () => {
      const res = await fetch("/api/data");
      const data = await res.json();
      setPlants(data['plants']);
    }

    fetchData();

  }, [])


  


  const getExperimentData = (element) => {
    if(experiment === "paint"){
      const paintElements = {
        "paintIcon": faPaintBrush,
        "fillIcon": faFillDrip,
        "eraseIcon": faEraser,
        "paintLabel": "Paint",
        "fillLabel": "Fill",
        "eraseLabel": "Erase",
        "paletteLabel": "palette"
      };
      
      return paintElements[element];
    } else if(experiment === "plant"){
      const plantElements = {
        "paintIcon": faSeedling,
        "fillIcon": faDiceSix, // faBraille
        "eraseIcon": faPersonDigging,
        "paintLabel": "Plant",
        "fillLabel": "Drifts",
        "eraseLabel": "Uproot",
        "paletteLabel": "seed box"
      }
      
      return plantElements[element];
    } else {
      return <></>
    }
  }

  const updatePlant = (id) => {
    setCurrentId(id)
  }

  const getColor = (id) => {
    if(plants[id]){
      return plants[id].color;
    }
    return "#FFFFFF";
  }

  const cellMouseDown = (x, y) => {

    if (currentTool === "paint") {
      updateGrid(currentId, x, y);
    } else if (currentTool === "erase") {
      updateGrid(0, x, y);
    } else if (currentTool === "select") {
      setSelectX0(x);
      setSelectY0(y);
      setSelectX1(x);
      setSelectY1(y);
    }
  }

  const cellMouseUp = (x, y) => {
    if (currentTool === "select") {
      setSelectX1(x);
      setSelectY1(y);
    }
  }

  const cellClick = (x, y) => {

    if (currentTool === "fill") {
      let tempGrid = gardenGrid;

      tempGrid = floodFill(x, y, tempGrid[y][x], currentId, tempGrid, selectionActive());
      setGardenGrid(tempGrid);
      setTimestamp(new Date());
    }

  }


  const floodFill = (x, y, target, newId, grid, selectBounds) => {

    if (newId === target) {
      return grid;
    }

    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
      return grid;
    }

    if (selectBounds) {

      const x0 = (selectX0 < selectX1) ? selectX0 : selectX1;
      const y0 = (selectY0 < selectY1) ? selectY0 : selectY1;

      const x1 = (selectX0 >= selectX1) ? selectX0 : selectX1;
      const y1 = (selectY0 >= selectY1) ? selectY0 : selectY1;

      if (!(x >= x0 && x <= x1 && y >= y0 && y <= y1)) {
        return grid;
      }
    }


    if (grid[y][x] === target) {
      grid[y][x] = newId;
      grid = floodFill(x, y - 1, target, newId, grid, selectBounds);
      grid = floodFill(x, y + 1, target, newId, grid, selectBounds);
      grid = floodFill(x - 1, y, target, newId, grid, selectBounds);
      grid = floodFill(x + 1, y, target, newId, grid, selectBounds);

    }

    return grid;

  }

  const mouseEnterCell = (x, y) => {
    if (isMouseDown && currentTool === "paint") {
      updateGrid(currentId, x, y);
    } else if (isMouseDown && currentTool === "erase") {
      updateGrid(0, x, y);
    } else if (isMouseDown && currentTool === "select") {
      setSelectX1(x);
      setSelectY1(y);
    }
  }

  const updateTool = (tool) => {
    if (tool !== currentTool) {

      if (tool === "select") {
        clearSelection();
      }

      setCurrentTool(tool);
    }
  }


  const updateGrid = (id, x, y) => {

    const x0 = (selectX0 < selectX1) ? selectX0 : selectX1;
    const y0 = (selectY0 < selectY1) ? selectY0 : selectY1;

    const x1 = (selectX0 >= selectX1) ? selectX0 : selectX1;
    const y1 = (selectY0 >= selectY1) ? selectY0 : selectY1;

    const updated = gardenGrid.map((row, currY) => {
      return row.map((e, currX) => {

        if (!selectionActive()) {
          if (x === currX && y === currY) {
            return id;
          } else {
            return e;
          }
        } else {
          if (x === currX && y === currY
            && x >= x0 && x <= x1 && y >= y0 && y <= y1) {
            return id;
          } else {
            return e;
          }

        }



      })
    })

    setGardenGrid(updated);
  }


  const selectionActive = () => {
    return !(selectX0 === -1 || selectY0 === -1
      || selectX1 === -1 || selectY1 === -1);
  }

  const clearSelection = () => {
    setSelectX0(-1);
    setSelectY0(-1);
    setSelectX1(-1);
    setSelectY1(-1);
  }

  const selectStyling = (x, y) => {

    if (!selectionActive()) {
      return "";
    }

    if (true) {

      const x0 = (selectX0 < selectX1) ? selectX0 : selectX1;
      const y0 = (selectY0 < selectY1) ? selectY0 : selectY1;

      const x1 = (selectX0 >= selectX1) ? selectX0 : selectX1;
      const y1 = (selectY0 >= selectY1) ? selectY0 : selectY1;

      let styling = ""

      if (x >= x0 && x <= x1 && y === y0) {
        styling += " " + styles.selectTop;
      }

      if (x >= x0 && x <= x1 && y === y1) {
        styling += " " + styles.selectBottom;
      }

      if (y >= y0 && y <= y1 && x === x0) {
        styling += " " + styles.selectLeft;
      }

      if (y >= y0 && y <= y1 && x === x1) {
        styling += " " + styles.selectRight;
      }

      return styling;
    }
    return "";


  }

  const toolStyling = (tool) => {
    return " " + (currentTool === tool ? styles.toolSelected : "")
  }

  const toggleExperiment = (e) => {
    
    setExperiment(experiment === "paint" ? "plant" : "paint")
  }

  return <>

    <div>
    <label className={styles.switch}>
      <input  type="checkbox" onChange={toggleExperiment}/>
      <span className={styles.slider}></span>
    </label>
    </div>

    <Link href="/garden/palette-chooser">
    <FontAwesomeIcon className={styles.addButton} icon={faCirclePlus} />
    </Link>
    <div className={styles.pageContainer}>

      <div className={styles.gridContainer}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}

      >
        <div className={styles.grid}>
          {
            gardenGrid && gardenGrid.map((row, y) => {

              return <>
                {
                  row.map((e, x) => {
                    return <div
                      onMouseEnter={() => mouseEnterCell(x, y)}
                      onMouseDown={() => cellMouseDown(x, y)}
                      onClick={() => cellClick(x, y)}
                      onMouseUp={() => cellMouseUp(x, y)}
                      timestamp={timestamp}
                      style={
                        {
                          backgroundColor: getColor(e)
                        }
                      } className={styles.square + selectStyling(x, y) + " " + styles.gridIcon}>

                        
                          <CustomIcon className={styles.gridIcon} 
                            grid={true}
                            color={"white"}
                            
                            icon={plants[e]?.name}/>

                      </div>
                  })
                }
              </>
            })
          }
        </div>
      </div>

      <div className={styles.toolContainer}>


        {
          (selectionActive() && currentTool !== "select") ?
            <div
              onClick={() => updateTool("select")}
              className={styles.tool + toolStyling("select")}>
              <FontAwesomeIcon className={styles.toolIcon} icon={faXmark} />

          Select
        </div>
            :
            <div
              onClick={() => updateTool("select")}
              className={styles.tool + toolStyling("select")}>
              <FontAwesomeIcon className={styles.toolIcon} icon={faObjectGroup} />

          Select
        </div>

        }
        <div
          onClick={() => updateTool("paint")}
          className={styles.tool + toolStyling("paint")}>
          <FontAwesomeIcon className={styles.toolIcon} icon={getExperimentData("paintIcon")} />

        {getExperimentData("paintLabel")}
      </div>
        <div
          onClick={() => updateTool("fill")}

          className={styles.tool + toolStyling("fill")}>
          <FontAwesomeIcon className={styles.toolIcon} icon={getExperimentData("fillIcon")} />

          {getExperimentData("fillLabel")}

      </div>
        <div
          onClick={() => updateTool("erase")}

          className={styles.tool + toolStyling("erase")}>
          <FontAwesomeIcon className={styles.toolIcon} icon={getExperimentData("eraseIcon")} />

          {getExperimentData("eraseLabel")}

      </div>
      </div>

      <div className={styles.paletteOuterContainer}>
        <div className={styles.paletteInnerContainer}>

        {(!palette || palette.length === 0) && <p className={styles.nopalettewarning}>
          You don't have any plants in your {getExperimentData("paletteLabel")}. You can add plants with the (+) button.
          </p>}

          {
            palette && palette.map(id =>{

              if(id < 1){
                return <> </>
              }

              return <div
              
              onClick={() => updatePlant(id)}
              
              className={styles.palettePlant + " " +
              (id === currentId ? styles.activePlant : "")}>

                <CustomIcon className={styles.paletteIcon} 
                
                color={getColor(id)}
                
                icon={plants[id]?.name}/>

                {plants[id]?.name}

                </div>

            })
          }
        </div>
      </div>
    </div>

  </>;
}
