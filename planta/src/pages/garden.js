

import styles from '@/styles/Garden.module.css'
import { useState, useEffect } from 'react';
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSeedling, faPaintBrush, faObjectGroup, faFillDrip, faEraser, faXmark, faCirclePlus, faXmarkCircle, faPalette, faArrowLeft, faChevronCircleLeft, faChevronLeft, faChevronUp, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {useLocalStorage} from '../hooks/useLocalStorage';

import CustomIcon from "../components/customicon";
import { faDiceSix } from '@fortawesome/free-solid-svg-icons';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';

export default function Garden() {


  const [plants, setPlants] = useState({});


  const [experiment, setExperiment] = useLocalStorage("experiment", "paint"); // paint or plant

  const [palette, setPalette] = useLocalStorage("palette", [1,2,3]);

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

  const [currentXMap, setXMap] = useLocalStorage("currentXMap", 2);
  const [currentYMap, setYMap] = useLocalStorage("currentYMap", 2);

  const [mapLoaded, setMapLoaded] = useState(false);

  const [gardenGrid, setGardenGrid] = useState([
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

  const [lastX, setLastX] = useState(-1);
  const [lastY, setLastY] = useState(-1);




  useEffect(() => {
   
    const fetchData = async () => {
      const res = await fetch("/api/data");
      const data = await res.json();
      setPlants(data['plants']);
    }

    fetchData();




  }, [])

  useEffect(() => {

    if(!mapLoaded && currentXMap !== null && currentYMap !== null && idLayout && entireGarden){
      
      setGardenGrid(entireGarden[idLayout[currentYMap][currentXMap]]);

      
      setMapLoaded(true)
    }


  }, [currentXMap, currentYMap, idLayout, entireGarden])




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
    setCurrentId(id);
    if(currentTool === "erase" || currentTool === "select"){
      setCurrentTool("paint");
    }
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
      updateMap(tempGrid);
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

  const updateMap = (updated) => {
    const currLayoutId = idLayout[currentYMap][currentXMap];

    const updatedMap = entireGarden.map((div, idx) => {
      if(idx === currLayoutId){
        return updated;
      } else {
        return div;
      }
    })
    setEntireGarden(updatedMap);
  }

  const moveMap = (dir) => {
    let newXMap = currentXMap
    let newYMap = currentYMap;
    
    switch(dir){
      case "up":
        newYMap = Math.max(currentYMap - 1, 0);
        setYMap(newYMap);
        break;
      case "down":
        newYMap = Math.min(currentYMap + 1, idLayout.length-1);
        setYMap(newYMap);
        break;
      case "left":
        newXMap = Math.max(currentXMap - 1, 0);
        setXMap(newXMap);
        break;
      case "right":
        newXMap = Math.min(currentXMap + 1, idLayout[0].length-1);
        setXMap(newXMap);
        break;
      default:
        return;
    }

      let newId = idLayout[newYMap][newXMap];
      if(newId === -1){
      const gLength = entireGarden.length;
      setEntireGarden(prevGarden => {
        return [...prevGarden,
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]]]
        })
        const newIdLayout = idLayout.map((row, y) => {
          return row.map((id, x) => {
            if(x === newXMap && y === newYMap){
              return gLength;
            } else {
              return id;
            }
          });
        })

        setIdLayout(newIdLayout)
        setGardenGrid([
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]])
      } else {
        setGardenGrid(entireGarden[newId]);
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
    updateMap(updated);


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

  const getNECornerCoords = () => {
    const x0 = (selectX0 < selectX1) ? selectX0 : selectX1;
    const y0 = (selectY0 < selectY1) ? selectY0 : selectY1;

    const x1 = (selectX0 >= selectX1) ? selectX0 : selectX1;
    const y1 = (selectY0 >= selectY1) ? selectY0 : selectY1;

    return {
      x: x1,
      y: y0
    };
  }

  return <>

    {/* <div>
    <label className={styles.switch}>
      <input  type="checkbox" onChange={toggleExperiment}/>
      <span className={styles.slider}></span>
    </label>
    </div> */}
    
    {/* <div style={{
      position: 'absolute',
      zIndex: 100000

    }}>
      {currentXMap}, {currentYMap}, {mapLoaded}
    </div> */}

    {
      (selectionActive() && !isMouseDown) && <div 

      onClick={clearSelection}

      style={{
        top: "calc(" + (getNECornerCoords()['y']) + "* 11.25vw + 100px + 5vw)",
        left: "calc(" + (getNECornerCoords()['x']) + " * 11.25vw + 5vw + 11.25vw - 15px)",
      }}
      className={styles.deselectBtn}>
        <FontAwesomeIcon icon={faXmarkCircle}/>
      </div>
    }


    <div className={styles.pageContainer}>



      <div id="grid" style={{touchAction: 'none'}} className={styles.gridContainer}

          
        

        onPointerDown={e => {
          setIsMouseDown(true);

          const elems = document.elementsFromPoint(e.clientX, e.clientY);
          const cell = elems.find(e => e.id.startsWith("cell-"));
          if(cell){
            const x = parseInt(cell.attributes['x'].value);
            const y = parseInt(cell.attributes['y'].value);
            cellMouseDown(x, y);
            cellClick(x, y)

          }
        }}

        onPointerMove={(e => {
          if(isMouseDown){
            const elems = document.elementsFromPoint(e.clientX, e.clientY);
            const cell = elems.find(e => e.id.startsWith("cell-"));
            if(cell){

              const x = parseInt(cell.attributes['x'].value);
              const y = parseInt(cell.attributes['y'].value);
              
              if(lastX !== x || lastY !== y){
                setLastX(x);
                setLastY(y);
                mouseEnterCell(x, y);
              }
            }
          }
        })}

        

        onPointerUp={e => {
          setIsMouseDown(false);
          const elems = document.elementsFromPoint(e.clientX, e.clientY);
          const cell = elems.find(e => e.id.startsWith("cell-"));
          if(cell){
            const x = parseInt(cell.attributes['x'].value);
            const y = parseInt(cell.attributes['y'].value);
            cellMouseUp(x, y)

          }
        }}

      >

{idLayout && <>

{currentXMap > 0 && <div className={styles.mapDirectionalButtonX}
      onClick={() => moveMap("left")}
      style={{
        left: '.3rem'
      }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    }
      {currentYMap > 0 && <div className={styles.mapDirectionalButtonY}
            onClick={() => moveMap("up")}
            
      style={{
        top: '.2rem'
      }}
      >
        <FontAwesomeIcon style={{margin: '-2px', paddingTop: '1px'}} icon={faChevronUp} />
      </div>}

      {currentXMap < idLayout[0].length-1 && <div className={styles.mapDirectionalButtonX}
            onClick={() => moveMap("right")}
            
            style={{
              right: '.3rem'
            }}
            >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>}

      {currentYMap < idLayout.length-1 && <div className={styles.mapDirectionalButtonY}
            onClick={() => moveMap("down")}
            
            style={{
        bottom: '.2rem'
      }}
      >
        <FontAwesomeIcon 
        style={{margin: '-2px', paddingTop: '1px'}} 
        icon={faChevronDown} />
      </div>}

      </>}
        <div  className={styles.grid}>
          {
            gardenGrid && gardenGrid.map((row, y) => {
              
              return <>
                {
                  row.map((e, x) => {
                    return <div
                    
                    id={"cell-" + x + "-" + y}
                    
                    
                    onClick={() => cellClick(x, y)}
                    timestamp={timestamp}
                      x={x}
                      y={y}
                      style={
                        {
                          backgroundColor: getColor(e),
                          
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
              style={{
                fontSize: "1.3rem",
                textAlign: "center",
              }}
              className={styles.tool + toolStyling("select")}>
              <FontAwesomeIcon className={styles.toolIcon} icon={faXmark} />

          Deselect
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

        <div className={styles.paletteList}>

        <Link href="/garden/palette-chooser">
      <FontAwesomeIcon className={styles.addButton} icon={faPalette} />
      </Link>

        {(!palette || palette.length === 0) && <p className={styles.nopalettewarning}>
          You don't have any plants in your {getExperimentData("paletteLabel")}. You can add plants with the (+) button.
          </p>}

          {
            palette && palette.map(id =>{
              
              if(id < 1){
                return <> </>
              }
              
              return <> <div
              
              onClick={() => updatePlant(id)}
              
              className={styles.palettePlant + " " +
              ((id === currentId &&
                (currentTool === "fill" || currentTool === "paint")) ? styles.activePlant : "")}>

                <CustomIcon className={styles.paletteIcon} 
                
                color={getColor(id)}
                
                icon={plants[id]?.name}/>

                {plants[id]?.name}

                </div>
                
          </>
            })
          }

        </div>
              <div className={styles.spacer}>
                  
                </div>

          </div>
      </div>
    </div>

  </>;
}
