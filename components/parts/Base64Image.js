import React, { useEffect } from 'react'
import { useRef } from 'react'
import getBase64 from '../../helpers/get-image';

function Base64Image({ image = null }) {
    const ref = useRef(null)
    useEffect(() => {
        // const getImageUrl = async (url, ref) => {
        //     const base64data = await getBase64(url, ref);
        //     return base64data;
        // }
        if (image) {
            ref.current.src = image;
        }
    }, []);
    return (
            <img ref={ref} className='w-full h-full' />
    )
}

export default Base64Image