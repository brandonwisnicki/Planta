import CustomIcon from "@/components/customicon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState, useEffect } from "react";
import styles from '@/styles/ToDo.module.css'
import { faEllipsis, faRepeat, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {


    const dayNames = {
        S: "Sunday",
        M: "Monday",
        T: "Tuesday",
        W: "Wednesday",
        R: "Thursday",
        F: "Friday",
        S: "Saturday"
    }

    const [plantData, setPlants] = useState([]);


    const getPlantName = (plantId) => {
      if(plantId === '999'){
        return "General";
      }
      
      return plantData[plantId]?.name;
    }

    const getPlantIcon = (plantId) => {

      if(plantId === '999'){
        return <></>;
      }
      
      return <div className={styles.plantIcon}> 
      <CustomIcon  icon={plantData[plantId]?.name} color={plantData[plantId]?.color} />
      </div>

    }

    const [view, setView] = useLocalStorage("view", "day");

    const [tasks, setTasks] = useLocalStorage("tasks", [
      {
        name: "Water Roses",
        repeat: "weekly",
        when: "S",
        affectedPlants: [1],
        completed: false,
      },
      {
        name: "Buy Garden Soil",
        repeat: false,
        when: "S",
        affectedPlants: [],
        completed: false,
      },
      {
        name: "Fertilize Tulip Garden",
        repeat: false,
        when: "S",
        affectedPlants: [2],
        completed: false,
      },
      {
        name: "Water Tulips",
        repeat: "weekly",
        when: "M",
        affectedPlants: [2],
        completed: false,
      },
      {
        name: "Add Mulch to Rose Garden",
        repeat: false,
        when: "M",
        affectedPlants: [1],
        completed: false,
      },
      {
        name: "Weed and clear debris",
        repeat: "monthly",
        when: "T",
        affectedPlants: [],
        completed: true,
      },
      {
        name: "Lay down new pathway",
        repeat: false,
        when: "T",
        affectedPlants: [7],
        completed: false,
      }
    ]);

    useEffect(() => {

      const fetchData = async () => {
        const res = await fetch("/api/data");
        const data = await res.json();
        setPlants(data['plants']);
      }
  
      fetchData();
  
  
  
  
    }, [])
  

    const getTasksByDay = () =>{
        const tasksByDay = {
            S: [],
            M: [],
            T: [],
            W: [],
            R: [],
            F: [],
            S: []
        }

        tasks.forEach(task => {
            tasksByDay[task.when].push(task)
        })

        // console.log(tasksByDay)
        // console.log(getTasksByPlant())
    

        return tasksByDay
    }

    const getTasksByPlant = () => {
      const tasksByPlant = {
      }

      tasks.forEach(task => {
      
        task.affectedPlants.forEach(plant => {
          if(!tasksByPlant[plant]){
            tasksByPlant[plant] = []
          }

          tasksByPlant[plant].push(task)
        })
      
      })

      tasksByPlant[999] = tasks.filter(task => task.affectedPlants.length === 0)
      return tasksByPlant;


    }

    const toggleView = (btn) => {
      setView(btn);
    }


    return <>
    <div className={styles.viewToggleContainer}>
    <div className={styles.viewToggle}>
    
    <span className={styles.viewToggleLabel}>View by</span>

    <span
    className={styles.viewToggleBtn}
    onClick={() => toggleView("day")}
    style={{
      backgroundColor: view === "day" ? "#90bf7a" : "#ffffff",
      borderRadius: "10rem 0 0 10rem",
      paddingLeft: "0.75rem",
    }}
    >Day</span>

    <span 
    className={styles.viewToggleBtn}
    onClick={() => toggleView("plant")}
    style={{
      backgroundColor: view === "plant" ? "#90bf7a" : "#ffffff",
      borderRadius: "0 10rem 10rem 0",
      paddingRight: "0.75rem",
    }}
    >Plant</span>

    </div>
    </div>
    {view === "day" && <div className={styles.toDoContainer}>
    
    {

      Object.keys(getTasksByDay()).map((day, index) => {
        return <>
        {getTasksByDay()[day].length > 0 && <> 
        
        <div className={styles.dayHeader}>
          
          <h2 className={styles.day}>{dayNames[day]}</h2>
        
        <div className={styles.sunInfoContainer}>
          <span className={styles.sunInfo}>

          <CustomIcon icon={"Sunset"}/>
            6:32am
          </span>

          <span className={styles.sunInfo}>
          <CustomIcon icon={"Sunrise"}/>

            6:32pm
          </span>
        </div>
        </div>
        <ul className={styles.list}>


        { getTasksByDay()[day].map((task, index) => {
          return <li className={styles.todoItem} key={task.name}>
            <div className={styles.innerTodo} title={task.name}>
              <input type="checkbox" defaultChecked={task.completed} name={task.name} id={task.name} />
            {task.name}

            </div>

          <div>

            {task.repeat && <FontAwesomeIcon title={`Repeats ${task.repeat}`} className={styles.repeatIcon} icon={faRepeat}/>}

            <FontAwesomeIcon className={styles.ellipsisIcon} icon={faEllipsis}/>
          </div>

            </li>
        })}
        </ul>
          </>}
          </>
      })
    }
      

    
    </div>}
    
    {view === "plant" && <div className={styles.toDoContainer}>
    
    {

      Object.keys(getTasksByPlant()).map((plantId, index) => {
        return <>
        {getTasksByPlant()[plantId].length > 0 && <> 
        
        <div className={styles.dayHeader}>
          <h2 className={styles.plant}>{getPlantName(plantId)} {getPlantIcon(plantId)} </h2>
        
        
        </div>
        <ul className={styles.list}>


        { getTasksByPlant()[plantId].map((task, index) => {
          return <li className={styles.todoItem} key={task.name}>
            <div className={styles.innerTodo} title={task.name}>
              <input type="checkbox" defaultChecked={task.completed} name={task.name} id={task.name} />
            {task.name}

            </div>

          <div>

            {task.repeat && <FontAwesomeIcon title={`Repeats ${task.repeat}`} className={styles.repeatIcon} icon={faRepeat}/>}

            <FontAwesomeIcon className={styles.ellipsisIcon} icon={faEllipsis}/>
          </div>

            </li>
        })}
        </ul>
          </>}
          </>
      })
    }
      

    
    </div>}
    


    </>;
  }
  