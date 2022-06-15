import { API, Auth } from "aws-amplify";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {PencilAltIcon} from "@heroicons/react/outline"
import { Dialog, Transition } from "@headlessui/react";
import DescriptionList from "./DescriptionList";
import {v4} from "uuid"
function Student({view}) {
  const id = useParams().studentid;
  const [refresh, setrefresh] = useState(true)
  const [data, setdata] = useState({});
  const [user, setuser] = useState({})
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [ClassNo, setClassNo] = useState("")
  const [Department, setDepartment] = useState("Computer Engineering")

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const navigate = useNavigate();

  const onSubmitHandler=(e)=>{
    e.preventDefault()
    API.post("Student",`/student/${id}`,{body: {
      email: email,
      username: username,
      Department:Department,
      ClassNo:ClassNo
    }}).then(data=>{console.log(data);setrefresh(!refresh)}).catch(err=>console.log(err))
  }
    
  useEffect(() => {
    API.get("Student", `/student/${id}`, {})
      .then((data) => {
        setdata(data);
        setuser(data.filter(x=>x.sk==='User Attributes')[0])
        var user=data.filter(x=>x.sk==='User Attributes')[0]
        setusername(user.username)
        setClassNo(user.ClassNo)
        setDepartment(user.Department)
        setemail(user.email)
      }) 
      .catch((err) => {navigate('/')});
  //  eslint-disable-next-line 
  }, [refresh]);

  const Change=()=>{
    console.log(refresh)
    setrefresh(!refresh)
  }
  return (
    <div>
      <div className='md:grid md:grid-cols-5 py-10 md:mr-5'>
            <img className="rounded-full my-10 mx-auto" src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png" width="150" height="150" alt="Alex Shatov"/>
            <div className='relative bg-slate-700 rounded-lg w-full h-full mr-5 col-span-4 p-5'>
                <div className='grid grid-cols-1 divide-y-[1px] '>
                    <div className="grid grid-cols-2 py-3">
                        <p className='text-gray-400 text-md'>Username: </p>
                        <p className='text-gray-200 text-lg'>{user?.username}</p>
                    </div>
                    <div className="grid grid-cols-2 py-3">
                        <p className='text-gray-400 text-md'>Email: </p>
                        <p className='text-gray-200 text-lg'>{user?.email}</p>
                    </div>
                    <div className="grid grid-cols-2 py-3">
                        <p className='text-gray-400 text-md'>Department: </p>
                        <p className='text-gray-200 text-lg'>{user?.Department}</p>
                    </div>
                    <div className="grid grid-cols-2 py-3">
                        <p className='text-gray-400 text-md'>ClassNo: </p>
                        <p className='text-gray-200 text-lg'>{user?.ClassNo}</p>
                    </div>
                </div>
                {view && 
                <PencilAltIcon onClick={()=>setOpen(true)} className="absolute top-0 right-0 text-gray-400 hover:text-black" width={30} />
                }
            </div>

        </div>
      {data.length>0 && <DescriptionList key={v4()} data={data} id={id} change={Change} view={view}/>}


      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={()=>setOpen(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
            </button>
            <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Student Attributes</h3>
                <form className="space-y-6"  onSubmit={(e)=>onSubmitHandler(e)}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <input type="email" onChange={e=>setemail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" value={email} required/>
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                        <input disabled onChange={e=>setusername(e.target.value)} type="text" name="username" id="username" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={username} required/>
                    </div>
                    <div>
                    <label htmlFor="Department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Department</label>
                    <select
          id="Department"
          onChange={(e) => setDepartment(e.target.value)}
          value={Department}
          name="Department"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option>Computer Engineering</option>
          <option>Mechanical Engineering</option>
          <option>Civil Engineering</option>
        </select>
        
                    </div>
                    <div>
                        <label htmlFor="ClassNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ClassNo</label>
                        <input value={ClassNo} onChange={(e)=>setClassNo(e.target.value)} type="text" name="ClassNo" id="ClassNo" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required/>
                    </div>
                    <button type="submit" onClick={()=>setOpen(false)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button>
                    
                </form>
            </div>
        </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Student;
