import { useLocalStorage } from "@/hooks/useLocalStorage";

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


    const [view, setView] = useLocalStorage("view", "day");

    const [tasks, setTasks] = useLocalStorage("tasks", [
      {
        name: "Water Roses",
        repeat: "weekly",
        when: "S",
        affectedPlants: [1]
      },
      {
        name: "Buy Garden Soil",
        repeat: false,
        when: "S",
        affectedPlants: []
      },
      {
        name: "Fertilize Tulip Garden",
        repeat: false,
        when: "S",
        affectedPlants: [2]
      },
      {
        name: "Water Tulips",
        repeat: "weekly",
        when: "M",
        affectedPlants: [2]
      },
      {
        name: "Add Mulch to Rose Garden",
        repeat: false,
        when: "M",
        affectedPlants: [1]
      },
      {
        name: "Weed and clear debris",
        repeat: "monthly",
        when: "T",
        affectedPlants: []
      },
      {
        name: "Lay down new pathway",
        repeat: false,
        when: "T",
        affectedPlants: [7]
      }
    ]);

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

        console.log(tasksByDay)

    

        return tasksByDay
    }

    const getTasksByPlant = () => {
      const tasksByPlant = {
      }


    }


    return <>
    
    {view === "day" && <>
    
    {

      Object.keys(getTasksByDay()).map((day, index) => {
        return <>
        {getTasksByDay()[day].length > 0 && <> <h2>{dayNames[day]}</h2>
        <ul>



        { getTasksByDay()[day].map((task, index) => {
          return <li key={task.name}>{task.name}</li>
        })}
        </ul>
          </>}
          </>
      })
    }
      

    
    </>}
    


    </>;
  }
  