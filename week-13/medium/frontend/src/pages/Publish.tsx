import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = ()=>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    return <div>
        <Appbar/>
        <div className="flex justify-center mt-20">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border
                border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-md" 
                placeholder="Title"/>
                <div className="mt-10">
                    <TextEditor onChange = {(e)=>{
                        setDescription(e.target.value)
                    }}/>
                    <button onClick={async ()=>{
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                            title,
                            content: description
                        },{
                            headers:{
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        console.log(response.data)
                        navigate(`/blog/${response.data.Post}`)
                    }} type="submit" className="shadow-md inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Publish post
                    </button>
                </div>
            </div>
            
        </div>
    </div>

    
        
    
}


function TextEditor({onChange} : {onChange : (e : ChangeEvent<HTMLTextAreaElement>) => void}){
    return <form>
       <div className=" shadow-md w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
           
           <div className=" bg-white rounded-b-lg">
               <label  className="sr-only">Publish post</label>
               <textarea onChange={onChange} id="editor" rows={10} className="focus:outline-none block w-full px-3 py-2 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required ></textarea>
           </div>
       </div>
       
    </form>
    
}