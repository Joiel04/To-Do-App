import { useState, useEffect } from 'react';
import './App.css';
import { ArrowBigDown, ArrowBigUp, Plus, Trash2 } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [NewTask, SetNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ... rest of your functions (addTask, deleteTask, moveTaskUp, moveTaskDown) stay the same


  function handleInput(e){
    SetNewTask(e.target.value);
  }
  
  function addTask(){

    if (NewTask.trim() === '') {
      alert('Please enter a task');
      return;
    }
    if (tasks.includes(NewTask)) {
      alert('Task already exists');
      return;
    }

    setTasks(prevtasks=>[...prevtasks,NewTask]);
    SetNewTask('');

  }

  function deleteTask(index){
    const updatedTasks= tasks.filter((element,i) =>{
        if(i !==index){
          return true
        }
        else{
          return false
        }
      }
    );
    setTasks(updatedTasks);
    SetNewTask('');

  }

  function moveTaskUp(index){ 
    if (index === 0) return; // Can't move the first task up
    const updatedTasks = [...tasks];
    const temp = updatedTasks[index - 1];
    updatedTasks[index - 1] = updatedTasks[index];
    updatedTasks[index] = temp;
    setTasks(updatedTasks);
    SetNewTask('');
    


  }

  function moveTaskDown(index){
    if (index == tasks.length -1) return;
    const updatedTasks=[...tasks];
    const temp= updatedTasks[index + 1];
    updatedTasks[index + 1] = updatedTasks[index];
    updatedTasks[index] = temp;
    setTasks(updatedTasks);
    SetNewTask('');

  }



  return (
    <div className='main-container'>
      <h1>To-Do App</h1>

      <div className='add-task-container'>
        <input 
          type= "text"
          placeholder='Add a new task...'
          value= {NewTask}
          onChange={handleInput}
          onKeyDown={(e)  => {
            if (e.key === "Enter")
                {addTask();}
          }}>
          
        </input>

        <button onClick={addTask}>Add Task</button>

      <div className='tasks-container'>
        <ol>{tasks.map((task,index)=>
          
          <li key={index}>
          <div className='task-item'>
            {task}
          </div>
            <div>
              <button onClick={() => deleteTask(index)}><Trash2 size={20} /></button>

              <button onClick={() => moveTaskUp(index)}><ArrowBigUp size="20px"   /></button>

              <button onClick={() => moveTaskDown(index)}><ArrowBigDown size="20px"   /></button>

              <input type="checkbox" />
            </div>

          </li>

        )}</ol>
      </div>

      </div>
    </div>
  )
}

export default App
