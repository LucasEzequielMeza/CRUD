import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TaskContext';

function TaskFormPage() {

  const {register, handleSubmit} = useForm();
  const { createTask} = useTasks()
  console.log(createTask)

  const onSubmit = handleSubmit((data) => {
    createTask(data)
  })


  return (
    <div  className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md mx-auto p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" placeholder="title" {...register ("title")} autoFocus />
          <textarea className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" rows="3" placeholder="description" {...register("description")}></textarea>
          <button type="submit" className="w-full text-white px-4 py-2 rounded-md my-2">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage