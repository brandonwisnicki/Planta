import CustomIcon from "@/components/customicon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState, useEffect } from "react";
import styles from '@/styles/ToDo.module.css'
import { faAdd, faEdit, faEllipsis, faPlusCircle, faRepeat, faSun, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { v4 as uuid } from 'uuid';

export default function Page() {


    const dayNames = {
        Su: "Sunday",
        M: "Monday",
        T: "Tuesday",
        W: "Wednesday",
        R: "Thursday",
        F: "Friday",
        Sa: "Saturday"
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

    const [selected, setSelected] = useState(-1);

    const [tasks, setTasks] = useLocalStorage("tasks", [
      {
        id: uuid(),
        name: "Water Roses",
        repeat: "weekly",
        when: "Sa",
        affectedPlants: [1],
        completed: false,
      },
      {
        id: uuid(),
        name: "Buy Garden Soil",
        repeat: false,
        when: "Sa",
        affectedPlants: [],
        completed: false,
      },
      {
        id: uuid(),
        name: "Fertilize Tulip Garden",
        repeat: false,
        when: "Su",
        affectedPlants: [2],
        completed: false,
      },
      {
        id: uuid(),
        name: "Water Tulips",
        repeat: "weekly",
        when: "M",
        affectedPlants: [2],
        completed: false,
      },
      {
        id: uuid(),
        name: "Add Mulch to Rose Garden",
        repeat: false,
        when: "M",
        affectedPlants: [1],
        completed: false,
      },
      {
        id: uuid(),
        name: "Weed and clear debris",
        repeat: "monthly",
        when: "T",
        affectedPlants: [],
        completed: true,
      },
      {
        id: uuid(),
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

    useEffect(() =>{ 
      setSelected(-1);
    }, [view])
  

    const getTasksByDay = () =>{
        const tasksByDay = {
            Su: [],
            M: [],
            T: [],
            W: [],
            R: [],
            F: [],
            Sa: []
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

    const toggleToDo = (id) =>{
      const newTasks = tasks.map(task => {
        if(task.id === id){
          task.completed = !task.completed;
        }
        return task;
      })

      setTasks(newTasks);
    }

    const removeTask = (id) => {
      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
      setSelected(-1);
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
    {view === "day" && <div 
    onClick={() => setSelected(-1)}
    className={styles.toDoContainer}>
    
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
          return <><li className={styles.todoItem + " " + 
          (selected === (index + day) && styles.todoItemClosed)} key={task.id}>
            <div className={styles.innerTodo} title={task.name}>
              <input type="checkbox" onClick={() => toggleToDo(task.id)} defaultChecked={task.completed} name={task.name} id={task.name} />
            {task.name}

            </div>

          <div>

            {task.repeat && <FontAwesomeIcon title={`Repeats ${task.repeat}`} className={styles.repeatIcon} icon={faRepeat}/>}

            {selected !== task.id && <FontAwesomeIcon onClick={e => {setSelected(task.id); e.stopPropagation()}} className={styles.ellipsisIcon} icon={faEllipsis}/>}          
          </div>

          <div 
          
          className={styles.contextMenu + " " + 
          (selected === task.id ? styles.contextMenuOpen : styles.contextMenuClosed)}> 

        
            
            <Link href={`/todo/${task.id}`}className={styles.contextEdit}>
            <FontAwesomeIcon icon={faEdit} />
              Edit
            </Link>

            <div onClick={() => removeTask(task.id)} className={styles.contextRemove}>
              <FontAwesomeIcon icon={faTrashAlt} />
              Remove
            </div>

          </div>
          
            </li>

            
</>
            
        })}
        </ul>
          </>}
          </>
      })
    }
      

    
    </div>}
    
    {view === "plant" && <div 
    
    onClick={() => setSelected(-1)}
    className={styles.toDoContainer}>
    
    {

      Object.keys(getTasksByPlant()).map((plantId, index) => {
        return <>
        {getTasksByPlant()[plantId].length > 0 && <> 
        
        <div className={styles.dayHeader}>
          <h2 className={styles.plant}>{getPlantName(plantId)} {getPlantIcon(plantId)} </h2>
        
        
        </div>
        <ul className={styles.list}>


        { getTasksByPlant()[plantId].map((task, index) => {
          return <li className={styles.todoItem} key={task.id}>
            <div className={styles.innerTodo} title={task.name}>
              <input type="checkbox" onClick={() => toggleToDo(task.id)} defaultChecked={task.completed} name={task.name} id={task.name} />
            {task.name}

            </div>

          <div>

            {task.repeat && <FontAwesomeIcon title={`Repeats ${task.repeat}`} className={styles.repeatIcon} icon={faRepeat}/>}

            <FontAwesomeIcon onClick={e => {
              setSelected(task.id); 
              e.stopPropagation()
            }} className={styles.ellipsisIcon} icon={faEllipsis}/>
          </div>

          <div 
          
          className={styles.contextMenu + " " + 
          (selected === (task.id) ? styles.contextMenuOpen : styles.contextMenuClosed)}> 

        
            
            <Link href={`/todo/${task.id}`}className={styles.contextEdit}>
            <FontAwesomeIcon icon={faEdit} />
              Edit
            </Link>

            <div onClick={() => removeTask(task.id)} className={styles.contextRemove}>
              <FontAwesomeIcon icon={faTrashAlt} />
              Remove
            </div>

          </div>

            </li>
        })}
        </ul>
          </>}
          </>
      })
    }
      

    
    </div>}


    <div className={styles.spacer}>

    </div>
    
    <Link href="/todo/add" className={styles.addButton}>
      <FontAwesomeIcon  icon={faPlusCircle} />
      </Link>

    </>;
  }
  