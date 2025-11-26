import React,{useState} from 'react'
import './CreateRepo.css'


export default function CreateRepo() {
    const[formdata,setFormData]=useState({
name:"",
 issues: [],
  content: [],
description: "",
    visibility: "public",
   
   
    });


    const handleChange=(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const owner=localStorage.getItem("userId");

       const datatosend={owner,
        ...formdata
        
       }
       console.log(datatosend);
    // https://13.50.196.250/repo/create
        const response=await fetch(` https://13.50.196.250/repo/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(datatosend)
        })

 const data = await response.json();
    console.log("Repository created:", data);

    if (response.ok) {
      alert("Repository created successfully!");
    } else {
      alert(data.error || "Failed to create repository");
    }
    }
    
  return (
    <>
    <div className="create-repo-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>Repository Name</label>
        <input type="text" name="name" onChange={handleChange} required />

        <label>Description</label>
        <input type="text" name="description" onChange={handleChange} />

        <label>Visibility</label>
        <input type="text" name="visibility" onChange={handleChange} />

        <label>Content</label>
        <input type="text" name="content" onChange={handleChange} />

        <label>Issues</label>
        <input type="text" name="issues" onChange={handleChange} />

        <button type="submit">Create Repository</button>
      </form>
    </div>
    </>
  )
}