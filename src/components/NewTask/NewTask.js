import React, {useState} from 'react';
import TaskForm from './TaskForm';
import Section from '../UI/Section'

const NewTask = (props) => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const addTaskHandler = async function (taskText) {
        setIsLoading(true)
        setError(null)
        try{
            const response = await fetch(
                'https://task-manager-73599-default-rtdb.firebaseio.com/task.json'
                ,{
                    method: 'POST',
                    body: JSON.stringify({name : taskText}),
                    headers: { 'Content-Type' : 'application/json'}
                }
                );

            if(!response.ok){
                throw new Error("Request Failed !!");
            }
            
            const data = await response.json();

            const addedTask = {id: data.name, name:taskText} //name is auto-generated id firebase specific
            props.onAddTask(addedTask);
            setIsLoading(false);

        }catch(err){
          setError(err.message || "Something went wrong !!");
        }
        setIsLoading(false);
    };

    return(
        <Section> 
            <TaskForm onAddTask = {addTaskHandler} loading = {isLoading}/>
            {error && <p>{error}</p>}
        </Section>
    );


}

export default NewTask;
