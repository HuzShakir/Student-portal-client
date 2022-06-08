import React from 'react'

function DynamicField() {
  return (
    <>
    <div>

                            <label
                            or="field"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Field
                          </label>
                        <input
                            type="text"
                            name="field"
                            id="field"
                            placeholder=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                          />
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>&nbsp;</label>
                                <p className="mx-2 dark:text-white">=</p>
                            </div>
                          <div>
                            <label
                            or="type"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Type
                          </label>
                          <select
                            id="type"
                            name="type"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mr-2 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          >
                            <option>Text</option>
                            <option>Number</option>
                            {/* <option>List</option> */}
                          </select>
                            </div>
                          <div>
                            <label
                            or="value"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Value
                          </label>
                          <input
                            type="text"
                            name="value"
                            id="value"
                            placeholder=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                          />
                            </div>
                            </>
  )
}

export default DynamicField