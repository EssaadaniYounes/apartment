import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-nextjs-toast'

import { Form } from './index'
import fetch from '../../helpers/fetch-data';
import Loader from './Loader';
const classes = {
    label: 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
    select: 'm-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-4 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
}

function AddApartment({ apartment = null }) {
    //fields
    const [isLoading, setIsLoading] = useState(false);
    const [place, setPlace] = useState(apartment ? apartment.place : '');
    const [location, setLocation] = useState(apartment ? apartment.location : '');
    const [space, setSpace] = useState(apartment ? apartment.space : '');
    const [class_, setClass_] = useState(apartment ? apartment.class : '');
    const [status, setStatus] = useState(apartment ? apartment.status : 'disponible');
    const [price, setPrice] = useState(apartment ? apartment.price : '');
    const [images, setImages] = useState(apartment ? JSON.parse(apartment?.images) : []);
    const [imagesPreview, setImagesPreview] = useState(apartment ? JSON.parse(apartment?.images) : []);
    let paths = apartment?.images || [];
    //functions
    //add
    const saveImages = async () => {
        paths = [];
        const formData = new FormData();
        let TotalImages = images.length;

        const date = new Date();
        const day = date.getDate();
        for (let i = 0; i < TotalImages; i++) {
            //get day of month

            paths.push(`http://127.0.0.1:8000/images/apartments/${i}-${day}-${images[i].name}`);

            formData.append('images' + i, images[i]);
            formData.append('Prefix' + i, `${i}-${day}-`);
        }

        formData.append('TotalImages', TotalImages);

        await fetch('apartments/store_img', 'post', formData, localStorage.getItem('token'))
    }
    const addApartment = async () => {
        setIsLoading(true);
        await saveImages();

        const payload = {
            'place': place,
            'space': space,
            'class': class_,
            'location': location,
            'status': status,
            'price': price,
            'images': paths
        }

        const response = await fetch('apartments', 'post', payload, localStorage.getItem('token'));
        if (response) setIsLoading(false);
        if (response.status === 200) {
            toast.notify('Appartement ajouté bien !', {
                duration: 2,
                type: "success"
            })
        } else {
            toast.notify(response.error, {
                duration: 2,
                type: "error"
            })
        };

    }
    //update
    const updateAppartment = async () => {
        setIsLoading(true);
        images.length && await saveImages();

        const payload = {
            'place': place,
            'space': space,
            'class': class_,
            'location': location,
            'status': status,
            'price': price,
            'images': paths
        }

        const response = await fetch(`apartments/${apartment.id}`, 'put', payload, localStorage.getItem('token'));
        if (response) setIsLoading(false);
        if (response.status === 200) {
            toast.notify('Appartement modifié bien !', {
                duration: 2,
                type: "success"
            })
        } else {
            toast.notify(response.error, {
                duration: 2,
                type: "error"
            })
        };

    }
    let imgsPreview = [];
    const handlePreview = (e) => {
        setImages(e.target.files);
        for (let i = 0; i < e.target.files.length; i++) {
            if (e.target.files[i]) {
                imgsPreview.push(URL.createObjectURL(e.target.files[i]));
            }
        }
        setImagesPreview(imgsPreview);
    }

    //render
    return (
        <>
            {isLoading && <Loader />}
            <Form>
                <ToastContainer align={"right"} position={"bottom"} />
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={place}
                            onChange={(e) => setPlace(e.target.value)} />
                        <label className={classes.label}>Lieu</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={space}
                            onChange={(e) => setSpace(e.target.value)} />
                        <label className={classes.label}>Superficie</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>

                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={class_}
                            onChange={(e) => setClass_(e.target.value)} />
                        <label className={classes.label}>Étage</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                        <label className={classes.label}>Prix</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <select className={classes.select}
                            placeholder=" "
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="disponible">Disponible</option>
                            <option value="solder">Solder</option>
                        </select>
                        <label className={classes.label}>Statut</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="file"
                            className={classes.input}
                            placeholder=" "
                            multiple
                            onChange={(e) => { handlePreview(e) }} />
                        <label className={classes.label}>Photos</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} />
                        <label className={classes.label}>Localisation</label>
                    </div>
                    {
                        // show add or update button if theres an apartment
                        !apartment
                            ? <button onClick={() => addApartment()} className="relative w-full h-[45px]  sm:w-fit inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                <span className="relative w-full justify-center h-full sm:text-right  sm:w-fit flex flex-row-reverse items-center px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>
                                        Ajouter
                                    </span>
                                </span>
                            </button> :
                            <button onClick={() => updateAppartment()} className="relative w-full h-[45px]  sm:w-fit inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-red-300 to-orange-500 group-hover:from-red-300 text-orange-700 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800">
                                <span className="relative w-full justify-center h-full sm:text-right  sm:w-fit flex flex-row-reverse items-center px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>
                                        Sauvgarder
                                    </span>
                                </span>
                            </button>
                    }
                </TwoItemsContainer>
            </Form>

            <div className='flex items-center flex-wrap gap-8 justify-center mt-6'>
                {imagesPreview && imagesPreview.map(image => {
                    return <img src={image} className='w-[100px] h-[100px] bg-white shadow-md rounded-md' alt='' key={image} />
                })}
            </div>

        </>
    )
}
const TwoItemsContainer = (props) => {
    return (
        <div className="flex flex-col justify-between md:flex-row gap-4 my-3 relative">
            {props.children}
        </div>
    )
}

export default AddApartment