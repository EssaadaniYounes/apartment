import React from 'react'

function Form(props) {
    return (
        <div className="bg-white shadow-md p-6 rounded-md w-[80%] mx-auto mt-6">
            {
                props.children
            }
        </div>
    )
}

export default Form