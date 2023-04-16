import { useState, useEffect } from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { v4 as uuid } from 'uuid';
import { faChevronLeft, faInfoCircle, faCirclePlus, faXmarkCircle, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from '@/styles/Add.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { useRouter } from 'next/router'


import { MultiSelect } from "react-multi-select-component";

export default function Add({id}) {

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
    const [plants, setPlants] = useState({});


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

    const [editMode, setEditMode] = useState(false);

    const [name, setName] = useState("");

    const [selectedDays, setSelectedDays] = useState(["M"])

    const [repeatable, setRepeatable] = useState("never");

    const [plantOptions, setPlantOptions] = useState([])

    const [selectedPlants, setSelectedPlants] = useState([]);
      const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day))
        } else {
            setSelectedDays([...selectedDays, day])
        }
    }

    const router = useRouter();

    useEffect(() => {
        if(tasks && plants && id){

            const taskToEdit = tasks.filter(t => t.id === id);
            if(taskToEdit.length === 0){
                return;
            }
            
            setName(taskToEdit[0].name);
            setSelectedDays([taskToEdit[0].when]);
            setRepeatable(taskToEdit[0].repeat || "never");
            setSelectedPlants(taskToEdit[0].affectedPlants.map((plantId) => {
                return {
                    label: plants[plantId]?.name,
                    value: plantId,
                    disabled: false,
                }
            }))
            setEditMode(true);
            
        }
    }, [plants, id, tasks])

    useEffect(() => {
   
        const fetchData = async () => {
          const res = await fetch("/api/data");
          const data = await res.json();
          setPlants(data['plants']);
        }
    
        fetchData();
    
    
    
    
      }, [])

        useEffect(() => {
            if(entireGarden){

            const plantSet = new Set();
                
                entireGarden.forEach((row, rowIndex) => {
                    row.forEach((col, colIndex) => {
                        col.forEach((cell, cellIndex) => {
                            if (cell !== 0) {
                                plantSet.add(cell)
                            }
                        })
                        
                })
            })
            
            const plantOptionsArr = [];

            for (const plantId of plantSet.values()){
                plantOptionsArr.push({
                    label: plants[plantId]?.name,
                    value: plantId,
                    disabled: false,
                })
            }

            
            setPlantOptions(plantOptionsArr)
            
        }   
            
        }, [entireGarden, plants])


        const addToDo = () => {
            
            if(isDisabled()){
                return;
            }

            const tasksToAdd = [];
            selectedDays.forEach((day) => {
                tasksToAdd.push({
                    id: uuid(),
                    name: name,
                    repeat: repeatable === "never" ? false : repeatable,
                    when: day,
                    affectedPlants: selectedPlants.map((plant) => plant.value),
                    completed: false,
                })

            })

            setTasks([...tasks, ...tasksToAdd])
            router.push("/todo")
        
        }

        const editToDo = () => {
            if(isDisabled()){
                return;
            }

            const tasksToAdd = [];
            selectedDays.forEach((day) => {
                tasksToAdd.push({
                    id: uuid(),
                    name: name,
                    repeat: repeatable === "never" ? false : repeatable,
                    when: day,
                    affectedPlants: selectedPlants.map((plant) => plant.value),
                    completed: tasks[id]?.completed,
                })

            })

            setTasks([...tasks.filter(t => t.id !== id), ...tasksToAdd])
            router.push("/todo")

        }

        const isDisabled = () =>{
            if (name === "" || selectedDays.length === 0) {
                return true;
            } else {
                return false;
            }
        }
        
    return <>

        <div className={styles.header}>

            <div  className={styles.headerTitle}>
            <Link href="/todo">
            <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} />
            </Link>
            <h1>New To Do</h1>
            </div>
         
        </div>

        <div className={styles.toDoBody}>


            <div className={styles.toDoItem}>
                <span className={styles.toDoItemLabel}>To Do Description</span>
                <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" placeholder="Water Tulips..." />
            </div>

            <div className={styles.toDoItem}>
                <span className={styles.toDoItemLabel}>When</span>
                <div className={styles.daySelector}>

                        {["Su", "M", "T", "W", "R", "F", "Sa"].map((day, index) => {
                            return <div
                            style={{
                                backgroundColor: selectedDays.includes(day) ? "#729C5E" : "#fff",
                            }}
                            onClick={() => toggleDay(day)}
                            className={styles.daySelectorItem}>
                                {day}
                            </div>


                        })}

                </div>
            </div>

            <div className={styles.toDoItem}>
                <span className={styles.toDoItemLabel}>Repeat</span>
                <div className={styles.repeatToggleContainer}>

                    <div className={styles.repeatToggle}>
                    

                    <span
                    className={styles.repeatToggleBtn}
                    onClick={() => setRepeatable("never")}
                    style={{
                    backgroundColor: repeatable === "never" ? "#90bf7a" : "#ffffff",
                    borderRadius: ".5rem 0 0 .5rem",
                    }}
                    >Never</span>

<span
                    className={styles.repeatToggleBtn}
                    onClick={() => setRepeatable("weekly")}
                    style={{
                    backgroundColor: repeatable === "weekly" ? "#90bf7a" : "#ffffff",
                    borderRadius: "0rem 0 0 0rem",
                    borderLeft: "none",
                    borderRight: "none",
                    // paddingLeft: "0.75rem",
                    }}
                    >Weekly</span>
                    <span 
                    className={styles.repeatToggleBtn}
                    onClick={() => setRepeatable("monthly")}
                    style={{
                    backgroundColor: repeatable === "monthly" ? "#90bf7a" : "#ffffff",
                    borderRadius: "0 .5rem .5rem 0",
                    }}
                    >Monthly</span>

                    </div>
            </div>
            </div>
            <div className={styles.toDoItem}>
                <span className={styles.toDoItemLabel}>Affected Plants</span>
                <MultiSelect 
                
                options={plantOptions}
                labelledBy="Select"
                hasSelectAll={false}
                value={selectedPlants}
                onChange={setSelectedPlants}

                />
            </div>

            <div className={styles.toDoItem}>
            <div className={styles.addButton + " " + (isDisabled() && styles.addButtonDisabled)} 
            onClick={editMode ? editToDo: addToDo}>
                <FontAwesomeIcon icon={faPlus} />
                <span>{editMode ? "Edit" : "Add"} To Do</span>
                </div>
            </div>

        </div>





      </>


}