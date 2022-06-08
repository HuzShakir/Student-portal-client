import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment,useRef, useState } from "react";
import DynamicField from "./DynamicField";
import {PlusCircleIcon,MinusCircleIcon} from '@heroicons/react/outline'
import {v4} from 'uuid'
import { API, } from "aws-amplify";
import { useParams } from "react-router-dom";
function StudentDetails({change}) {
  const id = useParams().studentid;
  const cancelButtonRef = useRef(null);
  const [open, setopen] = useState(false);
  const [name, setname] = useState("")
  const [fields, setfields] = useState([
  { 
   id:v4(),
  data:<DynamicField/>
}])
  const handler=(id)=>{
    setfields(fields.filter((field) => field.id !== id))
  }
  const onSubmitHandler=()=>{
    const data=fields.reduce((acc,cur)=>{ 
        return acc.concat(formToJSON(document.getElementById(cur.id)))
    },[])
    function formToJSON( elem ) {
      let output = {};
      new FormData( elem ).forEach(
        ( value, key ) => {
          if ( Object.prototype.hasOwnProperty.call( output, key ) ) {
            let current = output[ key ];
            if ( !Array.isArray( current ) ) {
              current = output[ key ] = [ current ];
            }
            current.push( value ); 
          } else {
            output[ key ] = value;
          }
        }
      );
      return  output 
    }
    API.post('Student',`/studentdetails/${id}`,{body: {Name:name,data:JSON.stringify(data)},}).then(data=>change()).catch(err=>console.log(err))    
    
    setopen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setopen(true)}
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800 ml-2 "
      >
        Add Fields
      </button>

      


      {/* <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Default</button> */}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setopen}
        >
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
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      onClick={() => setopen(false)}
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-toggle="authentication-modal"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <div className="py-6 px-6 lg:px-8">
                      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Set Fields
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e)=>setname(e.target.value)}
                            className="bg-gray-50 border w-3/4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder=""
                            required
                          />
                        </div>
                       {fields.map((u, i) =>
                        (
                            <form key={u.id} id={u.id} className="ml-3 flex items-center">
                              {u.data}
                                <div className="ml-3">
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>&nbsp;</label>
                                    <MinusCircleIcon onClick={()=>{handler(u.id)}} className="h-8 dark:text-gray-400 hover:text-gray-900"/>
                                </div>
                            </form>

                        ))}
                                    <PlusCircleIcon onClick={()=>{setfields(fields.concat({id:v4(),data:<DynamicField/>}))}} className="h-8 dark:text-gray-400 hover:text-gray-900"/>
                        
                        <button
                          type="submit"
                          onClick={onSubmitHandler}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default StudentDetails;
