import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
         <div className="bg-zinc-800 max-w-md mx-auto p-10 rounded-md">
            {
                registerErrors.map((error, i) => (
                    <div key={i} className="bg-red-500 p-2 text-white my-2">
                        {error}
                    </div>
                ))
            }
            <h1 className="text-2xl font-bold text-white flex justify-center">Register</h1>
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
            <p className="text-white flex gap-x-2 justify-between">
                  Do you have an account? <Link to="/login" className="text-blue-500">Login</Link>
              </p>
        </div>
    </div>
  )
}

export default RegisterPage
