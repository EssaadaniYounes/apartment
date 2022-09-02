import React, { useState } from 'react'
import fetch from '../../helpers/fetch-data';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { useUserContext } from '../../context/user';
const classes = {
    label: 'absolute text-[18px]-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function AddLodging({ setShowModal, setValue = null, lodging = null, setIsLoading, onCallBack = null }) {
    const [name, setName] = useState(lodging?.name ? lodging.name : '');
    const [type, setType] = useState(lodging?.type ? lodging.type : 'imouble');
    const [address, setAddress] = useState(lodging?.address ? lodging.address : '');
    const [city, setCity] = useState(lodging?.city ? lodging.city : '');
    const [numberElements, setNumberElements] = useState(lodging?.number_elements ? lodging.number_elements : 0);
    const [image, setImage] = useState(null);
    const [plan, setPlan] = useState(null);
    const { setLodgings } = useUserContext();

    let paths = lodging?.image ? lodging.image : '';
    let planPath = lodging?.plan ? lodging.plan : '';

    const uploadImage = async () => {


        const formData = new FormData();
        paths = `https://nhaila.com/apartment_backend/public/images/lodgings/${image[0].name}`;

        formData.append('image', image[0]);
        await fetch('lodgings/store', 'post', formData, localStorage.getItem('token'));
    }
    const uploadPlan = async () => {


        const formData = new FormData();
        planPath = `https://nhaila.com/apartment_backend/public/images/lodgings/plan/${plan[0].name}`;

        formData.append('pdf', plan[0]);
        await fetch('lodgings/store', 'post', formData, localStorage.getItem('token'));
    }
    const addLodging = async () => {

        setIsLoading(true);
        image && await uploadImage();
        plan && await uploadPlan();
        const payload = {
            'name': name,
            'type': type,
            'address': address,
            'city': city,
            'image': paths,
            'plan': planPath,
            'number_elements': numberElements,
        }
        const response = await fetch('lodgings', 'post', payload, localStorage.getItem('token'));
        if (response.status === 201) {
            setValue && setValue(response.data.id);
            setLodgings(v => [...v, response.data])
            setShowModal(false);
            toast.notify('Projet bien ajouté', {
                duration: 2,
                type: 'success'
            })
            onCallBack && onCallBack(null, response.data);
        }
        setIsLoading(false);
    }
    const updateLodging = async () => {
        setIsLoading(true);

        image && await uploadImage();
        plan && await uploadPlan();
        const payload = {
            'name': name,
            'type': type,
            'address': address,
            'city': city,
            'image': paths,
            'plan': planPath,
            'number_elements': numberElements,
        }

        const response = await fetch(`lodgings/${lodging.id}`, 'put', payload, localStorage.getItem('token'));
        if (response.data == 1) {
            setLodgings(v => v.map(l => l.id === lodging.id ? payload : l))
            setShowModal(false);
            toast.notify('Projet bien modifié', {
                duration: 2,
                type: 'success'
            })
        }
        setIsLoading(false);
    }
    return (
        <div className='z-10 absolute left-0 mt-[60px] top-0 bg-[#00000030] w-screen h-screen'>
            <ToastContainer />
            <div className="animate-[scale_1s_ease-in-out] -translate-y-1/2 -translate-x-1/2  md:left-1/2 top-1/2 absolute overflow-hidden bg-gray-50 rounded-md shadow-md left-[55%]  w-[70%] md:w-1/3">
                <div className='bg-white flex justify-between items-center px-4 w-full font-semibold text-xs md:text-lg text-center py-1'>
                    <span>{lodging ? 'Modifier' : 'Ajouter'} Une Projet</span>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShowModal(false)} className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="p-4 w-full">
                    <div className="relative z-0 mb-6 w-[full] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <label className={classes.label}>Nom</label>
                    </div>
                    <div className="relative z-0 mb-6 w-[full] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={city}
                            onChange={(e) => setCity(e.target.value)} />
                        <label className={classes.label}>Ville</label>
                    </div>
                    <div className="relative z-0 mb-6 w-[full] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                        <label className={classes.label}>Adresse</label>
                    </div>
                    <div className="relative z-0 mb-6 w-[full] group">
                        <select className={classes.input} value={type} onChange={(e) => setType(e.target.value)}>
                            <option value='imouble'>Imoubel</option>
                            <option value='terrain'>Terrain</option>
                        </select>
                        <label className={classes.label}>Type</label>
                    </div>

                    <div className="relative z-0 mb-6 w-[full] group">
                        <input type="number"
                            className={classes.input}
                            placeholder=" "
                            value={numberElements}
                            onChange={(e) => { setNumberElements(e.target.value); }}
                        />
                        <label className={classes.label}>Numero des élement</label>
                    </div>

                    <div className="relative z-0 mb-6 w-[full] group">
                        <input type="file"
                            className={classes.input}
                            placeholder=" "
                            accept='.png, .jpg, .jpeg'
                            onChange={(e) => { setImage(e.target.files); }}
                        />
                        <label className={classes.label}>Image</label>
                    </div>
                    <div className="relative z-0 mb-6 w-[full] group">
                        <input type="file"
                            className={classes.input}
                            placeholder=" "
                            accept='.pdf'
                            onChange={(e) => { setPlan(e.target.files); }}
                        />
                        <label className={classes.label}>Plan</label>
                    </div>
                    {
                        !lodging ?
                            <button onClick={() => addLodging()} className="relative block min-w-[40%] h-[45px] mx-auto sm:w-fit p-0.5 mb-2  overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                <span className="relative  min-w-full flex items-center justify-center h-full sm:text-right  sm:w-fit  px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>
                                        Ajouter
                                    </span>
                                </span>
                            </button> :
                            <button onClick={() => updateLodging()} className="relative block min-w-[40%] h-[45px] mx-auto sm:w-fit p-0.5 mb-2  overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-red-300 to-orange-500 group-hover:from-red-300 text-orange-700 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800">
                                <span className="relative w-full justify-center h-full sm:text-right  sm:w-fit flex flex-row-reverse items-center px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>
                                        Modifier
                                    </span>
                                </span>
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddLodging