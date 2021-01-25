import React from 'react'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Subjects = (props) => {

    const list = props.list

    return (
        <div>
            {
                list.map((val,index) => {
                if(val.name !== '')
                    return(
                        <div 
                            key={index.toLocaleString()} 
                            className="bg-gray-600 text-gray-200 rounded-lg px-2 py-3 ml-4 mr-4 mt-2"
                        >
                            <div className="flex justify-between">
                                <div className="p-2">
                                    <h3 className="font-mono text-lg ">{val.name}</h3>
                                </div>
                                <div className="p-2">
                                    <p>{val.attended}/{parseInt(val.bunked) + parseInt(val.attended)}</p>
                                </div>
                                <div className="p-2">
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => delete list[index]}/>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button 
                                    className="m-2 border rounded-full px-2 py-1 bg-gray-100 text-gray-700 font-semibold"
                                    onClick={() => {
                                                                                
                                    }}
                                >Attend</button>
                                <button className="m-2 border rounded-full px-2 py-1 font-semibold">Bunk</button>
                                <FontAwesomeIcon icon={faEdit} className="ml-4 text-xl mt-6"/>
                            </div>
                        </div>
                    )
                })
            }          
        </div>
    )
}

export default Subjects
