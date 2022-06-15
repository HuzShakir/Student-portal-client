import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { API } from "aws-amplify";
import { Fragment, useState } from "react";
import {v4} from "uuid"
import StudentDetails from "./StudentDetails";
export default function DescriptionList({ data, id, change,view }) {
  data = data.filter((x) => x.sk !== "User Attributes");
  const [selected, setSelected] = useState(data?.[0]);
  const onDelete =() => {
    API.del("Student", `/studentdetails/${id}`, {
      body: { sk: selected.sk },
    })
      .then((res) => {change()})
      .catch((err) => console.log(err));
    ;
  };

  return (
    <div className="bg-slate-700 shadow    sm:rounded-lg mx-3 mb-5">
      <div className="px-4 py-5 sm:px-6 sm:grid sm:grid-cols-3">
        <div className="">
          <h3 className="text-lg leading-6 font-medium text-gray-100">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-400">
            Personal details and application.
          </p>
        </div>
        {data.length>0 &&  <div className="z-10">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-400 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.sk}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-300"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-400 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {data.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-blue-200 text-indigo-900"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.sk}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>}
        {view && <div className="ml-auto">
          <StudentDetails change={change} />
          <button
            onClick={() => onDelete()}
            type="button"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Delete this field
          </button>
        </div>}
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {data.length>0 && selected?.value?.map((x, i) => {
            if (i % 2 === 0) {
              return (
                <div key={v4()} className="bg-slate-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-400">
                    {x.field}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {x.value}
                  </dd>
                </div>
              );
            } else {
              return (
                <div key={v4()} className="bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-400">
                    {x.field}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {x.value}
                  </dd>
                </div>
              );
            }
          })}
        </dl>
      </div>
    </div>
  );
}
