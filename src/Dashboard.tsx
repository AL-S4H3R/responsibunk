import React, { useState } from 'react'
import { faCheckCircle, faPlusCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuid } from 'uuid'

interface Subject {
    attended: number,
    bunked: number,
    name: string,
    id: string
}

const Dashboard: React.FC = () => {
    //local states
    const [name,setName] = useState('')
    const [,setSubDetails] = useState<Subject>({
        attended: 0,
        bunked: 0,
        name: '',
        id: ''
    })
    const [subList,setSubList] = useState<Array<Subject>>([])
    const [isEdit,setIsEdit] = useState(false)

    const addSubject = (sub: string) => {
        const sub_details: Subject = {
            attended: 0,
            bunked: 0,
            name: sub,
            id: uuid()
        }
        setSubDetails(sub_details)
        setSubList(state => [...state,sub_details])
        setName('')
    }

    React.useEffect(() => {
        let sub_list = localStorage.getItem('subject')
        if(sub_list){
            setSubList(JSON.parse(sub_list))
        }
    },[])
    
    React.useEffect(() => {
        localStorage.setItem('subject',JSON.stringify(subList))
    },[subList])
    

    return (
        <div className="bg-gray-800 h-screen w-full overflow-scroll">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap');
            </style>
            <nav className="bg-gray-900">
                <h1 className="text-gray-200 font-bold text-center text-xl p-2 tracking-wide" style={{fontFamily:"'Yusei Magic',sans-serif"}}>ResponsiBunk</h1>
            </nav>
            <div className="flex justify-center -mt-4">
                <input 
                    type="text" 
                    placeholder="Add Subject" 
                    className="bg-gray-900 border-b-2 border-blue-900 mt-12 px-3 py-3 focus:outline-none text-gray-100 font-mono text-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FontAwesomeIcon 
                    icon={faPlusCircle} 
                    className="mt-16 -ml-10 text-gray-100 text-2xl"
                    onClick={() => addSubject(name)}
                />
            </div>
            <div className="bg-gray-800 h-full w-full">                     
            {
                subList?.map((val,index) => {
                    return(
                        <div 
                            key={val.id + index} 
                            className="bg-gray-600 text-gray-200 rounded-lg px-2 py-3 ml-4 mr-4 mt-2"
                        >
                            <div className="flex justify-between">
                                <div className="p-2">
                                    <h3 className="font-mono text-lg ">{val.name}</h3>
                                </div>
                                <div className="p-2">
                                    <p>{val.attended}/{(val.bunked) + (val.attended)}</p>
                                </div>
                                <div className="p-2">
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => {
                                        let newArray = [...subList]
                                        let subject_index = subList.findIndex(sub => sub.id === val.id)
                                        newArray.splice(subject_index, 1)
                                        setSubList(newArray)
                                    }}/>
                                </div>
                            </div>
                            <div>
                                <EditSubject 
                                    isEdit={isEdit} 
                                    subList={subList} 
                                    subject_id={val.id}
                                    setSubList={setSubList}
                                    setIsEdit={setIsEdit}
                                />
                            </div>
                            <div className="mt-4">
                                <button 
                                    className="m-2 border rounded-full px-2 py-1 bg-gray-100 text-gray-700 font-semibold"
                                    onClick={() => {
                                        let newArray = [...subList]
                                        let subject_index = subList.findIndex(sub => sub.id === val.id)
                                        newArray[subject_index] = {...newArray[subject_index],attended: newArray[subject_index].attended + 1}                                 
                                        setSubList(newArray)
                                    }}
                                >
                                    Attend
                                </button>
                                <button 
                                    className="m-2 border rounded-full px-2 py-1 font-semibold"
                                    onClick={() => {
                                        let newArray = [...subList]
                                        let subject_index = subList.findIndex(sub => sub.id === val.id)
                                        newArray[subject_index] = {...newArray[subject_index], bunked: newArray[subject_index].bunked + 1}
                                        setSubList(newArray)
                                    }}
                                >
                                    Bunk
                                </button>
                                <FontAwesomeIcon 
                                    icon={faEdit} 
                                    className="ml-4 text-xl mt-6"
                                    onClick={() => setIsEdit(true)}
                                />
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

interface EditSub {
    isEdit: boolean;
    subList: Array<Subject>;
    subject_id: string;
    setSubList: Function;
    setIsEdit: Function
}

const EditSubject: React.FC<EditSub> = ({
    isEdit, 
    subList, 
    subject_id, 
    setSubList,
    setIsEdit
}) => {
    const subject_index = subList.findIndex(sub => sub.id === subject_id)

    const [attended,setAttended] = useState<number>(subList[subject_index].attended)
    const [bunked,setBunked] = useState<number>(subList[subject_index].bunked)
    const [name,setName] = useState<string>(subList[subject_index].name)
    
    if(isEdit){
        return(
            <div className="border-2 bg-gray-900 border-gray-800 rounded-lg font-mono">
                <div className="flex justify-between">
                    <h2 className="text-center text-gray-200 font-semibold font-mono">Edit Subject</h2>
                    <FontAwesomeIcon icon={faWindowClose} onClick={() => setIsEdit(false)} className="mt-1 mr-4"/>
                </div>
                <div className="mt-2">
                    <label htmlFor="">Name:</label>
                    <input 
                        type="text" 
                        placeholder="Subject Name" 
                        value={name} 
                        className="text-gray-400 ml-3 bg-gray-900 border-b-2 border-blue-900 text-center"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex mt-2">
                    <div>
                        <label htmlFor="">Attended:</label>
                        <input 
                            type="number" 
                            className="w-1/2 bg-gray-900 text-gray-400 border-2 rounded-lg border-blue-900 text-center"
                            placeholder="Attended" 
                            value={attended}
                            onChange={(e) => setAttended(e.target.valueAsNumber)}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Bunked:</label>
                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            placeholder="Bunked" 
                            value={bunked}
                            className="w-1/2 bg-gray-900 text-gray-400 border-2 rounded-lg border-blue-900 text-center"
                            onChange={(e) => setBunked(e.target.valueAsNumber)}
                        />
                    </div>
                    <div className="mr-3 mt-4 flex">
                        <FontAwesomeIcon
                            icon={faCheckCircle} 
                            onClick={() => {
                                let newArray = [...subList]
                                newArray[subject_index] = {
                                    ...newArray[subject_index],
                                    attended: attended,
                                    bunked: bunked,
                                    name: name
                                }
                                setSubList(newArray)
                                setIsEdit(false)                                
                            }}
                            className="m-2"
                        />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return <></>
    }
}

export default Dashboard
