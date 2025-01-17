import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RegisterPage() {

    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit( async (data) => {
        const res = await registerRequest(data);
        console.log(res);
    })

  return (
    <div className="bg-zinc-500 max-w-md mx-auto p-10 rounded-md">
        <form onSubmit={onSubmit}>
            <input type="text" {... register("username", {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="username"
            /> 
            <input type="email" {... register("email", {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="email"
            />
            <input type="password" {... register("password", {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="password"
            />
            <button type="submit" className="w-full text-white px-4 py-2 rounded-md my-2">Register</button>
        </form> 
    </div>
  )
}

export default RegisterPage