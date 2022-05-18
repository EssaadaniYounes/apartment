import React, { useState } from 'react'
import fetch from '../../helpers/fetch-data';
import { useUserContext } from '../../context/user';
const classes = {
    label: 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function AddLodging({ setShowModal, setValue }) {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [image, setImage] = useState();
    const { setLodgings } = useUserContext();

    let paths;

    const uploadImage = async () => {


        const formData = new FormData();
        paths = `http://127.0.0.1:8000/images/lodgings/${image[0].name}`;

        formData.append('image', image[0]);
        await fetch('lodgings/store', 'post', formData, localStorage.getItem('token'));
    }
    const addLodging = async () => {
        await uploadImage();
        const payload = {
            'name': name,
            'address': address,
            'city': city,
            'image': paths
        }

        const response = await fetch('lodgings', 'post', payload, localStorage.getItem('token'));

        setValue(response.data.id);
        setLodgings(v => [...v, response.data])
        setShowModal(false);
    }
    return (

        <div className="animate-[scale_1s_ease-in-out] -translate-y-1/2 -translate-x-1/2  md:left-1/2 top-1/2 absolute overflow-hidden bg-gray-50 rounded-md shadow-md left-[55%]  w-[70%] md:w-1/3">
            <div className='bg-white flex justify-between items-center px-4 w-full font-semibold text-xs md:text-lg text-center py-1'>
                <span>Ajouter Une Projet</span>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShowModal(false)} className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="p-4 w-full">
                <div className="relative z-0 mb-6 w-[full] group">
                    <input type="text"
                        className={classes.input}
                        placeholder=" "
                        onChange={(e) => setName(e.target.value)} />
                    <label className={classes.label}>Nom</label>
                </div>
                <div className="relative z-0 mb-6 w-[full] group">
                    <input type="text"
                        className={classes.input}
                        placeholder=" "
                        onChange={(e) => setCity(e.target.value)} />
                    <label className={classes.label}>Ville</label>
                </div>
                <div className="relative z-0 mb-6 w-[full] group">
                    <input type="text"
                        className={classes.input}
                        placeholder=" "
                        onChange={(e) => setAddress(e.target.value)} />
                    <label className={classes.label}>Adresse</label>
                </div>
                <div className="relative z-0 -mt-[6px] w-full md:w-[49%] group">
                    <input type="file"
                        className={classes.input}
                        placeholder=" "
                        accept='.png, .jpg, .jpeg'
                        onChange={(e) => { setImage(e.target.files); }}
                    />
                    <label className={classes.label}>Image</label>
                </div>
                <button onClick={() => addLodging()} className="relative block min-w-[40%] h-[45px] mx-auto sm:w-fit p-0.5 mb-2  overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative  min-w-full flex items-center justify-center h-full sm:text-right  sm:w-fit  px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            Ajouter
                        </span>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default AddLodging