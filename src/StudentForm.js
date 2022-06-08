import { API } from "aws-amplify";
import React, { useState } from "react";
export default function StudentForm({change}) {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [Department, setDepartment] = useState("Computer Engineering");
  const [ClassNo, setClassNo] = useState("")
  function onSubmitHandler(e) {
    API.post("Student", "", {
      body: {
        email: email,
        username: username,
        groupName: "Student",
        Department:Department,
        ClassNo:ClassNo
      },
    })
      .then((response) => {
        change()
      })
      .catch((error) => {
        console.log(error);
      });
   
    setusername("")
    setDepartment("Computer Engineering")
    setClassNo("")
    setemail("")
    e.preventDefault();
  }
  return (
    <div className="mx-5 md:w-1/2 md:mx-auto mb-10">
      <form
        className="rounded-lg border-2 p-5"
        onSubmit={onSubmitHandler}
      >
        <div className="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-300 text-center">
          Create Student
        </div>
        <div className="mb-6 ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Username
          </label>
          <input
            placeholder="Bablu"
            onChange={(e) => setusername(e.target.value)}
            value={username}
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <label
          htmlFor="Department"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Department
        </label>
        <select
          id="Department"
          onChange={(e) => setDepartment(e.target.value)}
          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Computer Engineering</option>
          <option>Mechanical Engineering</option>
          <option>Civil Engineering</option>
        </select>
        <div className="mb-6 ">
          <label
            htmlFor="classno"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Class No.
          </label>
          <input
            onChange={e=>setClassNo(e.target.value)}
            value={ClassNo}
            type="text"
            id="classno"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="w-full text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
