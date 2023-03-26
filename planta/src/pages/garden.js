

import styles from '@/styles/Garden.module.css'
import { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSeedling, faPaintBrush, faObjectGroup, faFillDrip, faEraser, faXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";


export default function Garden() {


  const plants = [

    {
      id: 0,
      name: "Empty",
      color: "#FFFFFF"
    },

    {
      id: 1,
      name: "Rose",
      color: "#FF9797"
    },
    {
      id: 2,
      name: "Tulip",
      color: "#2400FF"
    },
    {
      id: 3,
      name: "Apple",
      color: "#FF0000"
    },
    {
      id: 4,
      name: "Carrot",
      color: "#FF7A00"
    },
    {
      id: 5,
      name: "Pepper",
      color: "#287E00"
    },
    {
      id: 6,
      name: "Lemon",
      color: "#FFE900"
    },
    {
      id: 7,
      name: "Path",
      color: "#727272"
    },

  ]





  const [palette, setPalette] = useState([1, 2, 3,4,5,6,7,1,2,3,4]);

  const [gardenGrid, setGardenGrid] = useState([[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]]);

  const [timestamp, setTimestamp] = useState(new Date());

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [currentTool, setCurrentTool] = useState("paint");

  const [currentId, setCurrentId] = useState(1);


  const [selectX0, setSelectX0] = useState(-1);
  const [selectY0, setSelectY0] = useState(-1);
  const [selectX1, setSelectX1] = useState(-1);
  const [selectY1, setSelectY1] = useState(-1);


  const updatePlant = (id) => {
    setCurrentId(id)
  }

  const getColor = (id) => {
    return plants[id].color;
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


  return <>

<FontAwesomeIcon className={styles.addButton} icon={faCirclePlus} />

    <div className={styles.pageContainer}>

      <div className={styles.gridContainer}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}

      >
        <div className={styles.grid}>
          {
            gardenGrid.map((row, y) => {

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
                      } className={styles.square + selectStyling(x, y)}></div>
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
          <FontAwesomeIcon className={styles.toolIcon} icon={faPaintBrush} />

        Paint
      </div>
        <div
          onClick={() => updateTool("fill")}

          className={styles.tool + toolStyling("fill")}>
          <FontAwesomeIcon className={styles.toolIcon} icon={faFillDrip} />

        Fill
      </div>
        <div
          onClick={() => updateTool("erase")}

          className={styles.tool + toolStyling("erase")}>
          <FontAwesomeIcon className={styles.toolIcon} icon={faEraser} />

        Erase
      </div>
      </div>

      <div className={styles.paletteOuterContainer}>
        <div className={styles.paletteInnerContainer}>
          {
            palette.map(id =>{

              return <div
              
              onClick={() => updatePlant(id)}
              
              className={styles.palettePlant + " " +
              (id === currentId ? styles.activePlant : "")}>

                <FontAwesomeIcon className={styles.paletteIcon} 
                style={{
                  color: plants[id].color
                }}
                icon={faSeedling} />

                {plants[id].name}

                </div>

            })
          }
        </div>
      </div>
    </div>

  </>;
}
