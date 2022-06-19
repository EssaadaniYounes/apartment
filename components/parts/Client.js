import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-nextjs-toast'

import { Form } from './index'
import fetch from '../../helpers/fetch-data';
import { Loader, TwoItemsContainer } from './';
import Image from 'next/image';
import { useUserContext } from '../../context/user';
const classes = {
    label: 'absolute text-[18px]-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}

function Client({ client = null, setShowModal = null, setClient = null }) {
    const { setClients } = useUserContext();
    //fields
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(client ? client.email : '');
    const [name, setName] = useState(client ? client.name : '');
    const [address, setAddress] = useState(client ? client.address : '');
    const [phone, setPhone] = useState(client ? client.phone : '');
    const [phoneSecond, setPhoneSecond] = useState(client ? client.phone_second : '');
    const [cin, setCin] = useState(client ? client.cin : '');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState(client ? JSON.parse(client?.images) : '');
    let paths = client?.images ? client.images : '';

    //functions
    const uploadImages = async () => {

        paths = [];
        const formData = new FormData();
        let TotalImages = images.length;

        const date = new Date();
        const day = date.getDate();
        for (let i = 0; i < TotalImages; i++) {
            //get day of month

            paths.push(`http://meatmarketdanish.com/apt/storage/images/clients/${i}-${day}-${images[i].name}`);

            formData.append('images' + i, images[i]);
            formData.append('Prefix' + i, `${i}-${day}-`);
        }

        formData.append('TotalImages', TotalImages);

        await fetch('clients/store', 'post', formData, localStorage.getItem('token'))
    }
    //add

    const AddClient = async () => {
        setIsLoading(true);
        images.length && await uploadImages();
        const payload = {
            'email': email,
            'address': address,
            'phone': phone,
            'phone_second': phoneSecond,
            'cin': cin,
            'images': paths,
            'name': name
        }

        const response = await fetch('clients', 'post', payload, localStorage.getItem('token'));
        if (response) setIsLoading(false);
        if (response.status === 200) {
            toast.notify('Client bien ajouté !', {
                duration: 2,
                type: "success"
            })
            setClients(v => [...v, response.data]);
            setClient && setClient(response.data.id);
            setShowModal && setShowModal(false);
        } else {
            toast.notify(response.error, {
                duration: 2,
                type: "error"
            })
        };

    }
    //update
    const updateClient = async () => {
        setIsLoading(true);
        images && await uploadImages();
        const payload = {
            'email': email,
            'address': address,
            'phone': phone,
            'phone_second': phoneSecond,
            'cin': cin,
            'images': paths,
            'name': name
        }

        const response = await fetch(`clients/${client.id}`, 'put', payload, localStorage.getItem('token'));
        if (response) setIsLoading(false);
        if (response.status === 200) {
            toast.notify('Client modifié bien !', {
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                        <label className={classes.label}>Tél</label>
                    </div>

                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={phoneSecond}
                            onChange={(e) => setPhoneSecond(e.target.value)} />
                        <label className={classes.label}>Tél (option)</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <label className={classes.label}>Nom</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <label className={classes.label}>Email</label>
                    </div>

                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                        <label className={classes.label}>Address</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={cin}
                            onChange={(e) => setCin(e.target.value)} />
                        <label className={classes.label}>CIN</label>
                    </div>


                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative -mt-[6px] z-0 mb-6 w-full md:w-[49%] group">
                        <input type="file"
                            className={classes.input}
                            placeholder=" "
                            accept='.png, .jpg, .jpeg'
                            multiple
                            onChange={(e) => { handlePreview(e) }} />
                        <label className={classes.label}>Carte Nationalle</label>
                    </div>

                </TwoItemsContainer>
            </Form>
            {imagesPreview.length > 0 &&
                <div className="relative flex items-center flex-wrap gap-8 justify-center mt-6">
                    {imagesPreview.map((image, index) => {
                        return <Image key={index} width={300} height={150} style={{ borderRadius: 15 }} src={image} priority />
                    })}
                </div>
            }
            <div className="mx-auto w-fit mt-8">
                {
                    // show add or update button if theres an client
                    !client
                        ? <button onClick={() => AddClient()} className="relative w-full h-[45px]  sm:w-fit inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative w-full justify-center h-full sm:text-right  sm:w-fit flex flex-row-reverse items-center px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    Ajouter
                                </span>
                            </span>
                        </button> :
                        <button onClick={() => updateClient()} className="relative w-full h-[45px]  sm:w-fit inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-red-300 to-orange-500 group-hover:from-red-300 text-orange-700 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800">
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
            </div>
        </>
    )
}


export default Client