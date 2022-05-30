import React from 'react'

const TwoItemsContainer = (props) => {
    return (
        <div className="flex flex-col justify-between md:flex-row gap-4 my-3 relative">
            {props.children}
        </div>
    )
}

export default TwoItemsContainer