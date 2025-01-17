import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

    const { register, handleSubmit, formState: {errors} } = useForm();
    const { singup, isAuthenticated, registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated){
            navigate('/tasks');
        }
    }, [isAuthenticated])

    const onSubmit = handleSubmit( async (data) => {
        singup(data);
    })

  return (
    <div className="bg-zinc-500 max-w-md mx-auto p-10 rounded-md">
        {
            registerErrors.map((error, i) => (
                <div key={i} className="bg-red-500 p-2 text-white" key={i}>
                    {error}
                </div>
            ))
        }
        <form onSubmit={onSubmit}>
            <input type="text" {... register("username", {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="username"
            /> 
            {
                errors.username && <span className="text-white">Username is required</span>
            }
            <input type="email" {... register("email", {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="email"
            />
            {
                errors.email && <span className="text-white">Email is required</span>
            }
            <input type="password" {... register("password", {required: true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="password"
            />
            {
                errors.password && <span className="text-white">Password is required</span>
            }
            <button type="submit" className="w-full text-white px-4 py-2 rounded-md my-2">Register</button>
        </form> 
    </div>
  )
}

export default RegisterPage
