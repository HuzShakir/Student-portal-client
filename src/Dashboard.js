import { API, Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import FacultyForm from './FacultyForm'
import StudentList from './StudentList'
import StudentForm from './StudentForm'
import {v4} from 'uuid'
export default function Dashboard() {
  const [user, setuser] = useState(false)
  const [students, setstudents] = useState([])
  const [refresh, setrefresh] = useState(true)
  useEffect(() => {
    API.get('Student','/students',{}).then(
      data=>{       
       setstudents(data)}
    )

    Auth.currentSession().then(data=>setuser(data)).catch(err=>setuser(false))

  }, [refresh])
  
  const Change=()=>{
    setrefresh(!refresh)
  }

  return (
    <div>
            <div className="p-3 rounded-lg border-gray-500 border-4 m-5">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 ">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-blue-300 text-left text-lg">Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-blue-300 text-left text-lg">Email</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-blue-300 text-left text-lg">Department</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-blue-300 text-left text-lg">ClassNo</div>
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {
                            students.map(student=>(

                            <StudentList key={v4()} student={student}/>
                            ))
                            }
                            
                        </tbody>
                    </table>
                </div>               
            </div>
        {(user?.accessToken?.payload['cognito:groups'][0]==='Faculty' || user?.accessToken?.payload['cognito:groups'][0]==='SuperAdmin' ) && <FacultyForm/>}
        {(user?.accessToken?.payload['cognito:groups'][0]==='Faculty' ) && <StudentForm change={Change}/>}
    </div>
  )
}
