import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

export default function FacultyForm() {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    useEffect(() => {
    
     
    }, [email,username])
    function onSubmitHandler(e){
      API.post('Student', '',{body:{
          "email":email,
          "username":username,
          "groupName":"Faculty"
      }}).then(response => {
      // Add your code her
  })
  .catch(error => {
      console.log(error);
  });
        setemail("")
        setusername("")
        e.preventDefault()
    }


  return (
      <div className='mt-20 mb-10 mx-5 md:w-1/2 md:mx-auto'>
        <form className='rounded-lg border-2 p-5' onSubmit={onSubmitHandler}>
            <div className="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-300 text-center">Create Faculty</div>
  <div class="mb-6 ">
    <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
    <input type="email" id="email" onChange={(e)=>setemail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-6">
    <label htmlFor="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
    <input placeholder='Bablu' type="text" onChange={(e)=>setusername(e.target.value)} id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className='w-full text-center'>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </div>
</form>

</div>
  )
}
