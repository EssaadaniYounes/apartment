import React, { useRef } from 'react'
import { useOnClickOutside } from '../../hooks/click-outside';

function Modal({ children, setShowModal }) {
    const ref = useRef(null);
    useOnClickOutside(ref, () => { setShowModal(false) })
    return (
        <div className='z-10 absolute left-0 pl-28 top-0 bg-[#00000030] w-screen min-h-screen'>
            <div className="relative w-full h-full flex justify-center">
                <div ref={ref} className='w-2/3 p-4 min-h-full bg-white my-12 rounded-md pt-2 mt-[70px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal