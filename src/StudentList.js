import React from 'react'
import { useNavigate } from "react-router-dom";
function StudentList({student}) {
  const navigate = useNavigate();
  return (
    <tr className='hover:bg-slate-700 ' onClick={()=>navigate(`/student/${student.Attributes[0].Value}`)}>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                          <img className="rounded-full" src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png" width="40" height="40" alt="Alex Shatov"/></div>
                                        <div className=" text-gray-200">{student.Username}</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left text-slate-200">{student.Attributes.filter(x=>x.Name==="email")[0].Value}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left  text-slate-200">{student.Attributes.filter(x=>x.Name==="custom:Department")[0].Value}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left  text-slate-200">{student.Attributes.filter(x=>x.Name==="custom:ClassNo")[0].Value}</div>
                                </td>
                                
                            </tr>
  )
}

export default StudentList