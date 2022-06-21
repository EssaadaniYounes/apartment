import React, { useState, useRef, useEffect } from 'react'
import { toast, ToastContainer } from 'react-nextjs-toast'
import { Form } from './index'
import fetch from '../../helpers/fetch-data';
import { Loader, TwoItemsContainer } from './';
import AddLodging from './AddLodging';
import { useUserContext } from '../../context/user';
import { useRouter } from 'next/router';
const classes = {
    label: 'absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
    select: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-4 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
}

function AddApartment({ apartment = null, setModal = null, setProperty = null }) {
    const { lodgings, setApartments } = useUserContext();
    const router = useRouter();
    //fields
    const [type, setType] = useState(apartment ? apartment.type : 'appartment');
    const [numApartment, setNumApartment] = useState(apartment ? apartment.num_apartment : 0);
    const [lounge, setLounge] = useState(apartment ? apartment.lounge : 1);
    const [room, setRoom] = useState(apartment ? apartment.room : 1);
    const [toilet, setToilet] = useState(apartment ? apartment.toilet : 1);
    const [cuisine, setCuisine] = useState(apartment ? apartment.cuisine : 1);
    const [lodgingId, setLodgingId] = useState(apartment ? apartment.lodging_id : 0);
    const [city, setCity] = useState(apartment ? apartment.city : '');
    const [address, setAddress] = useState(apartment ? apartment.address : '');
    const [space, setSpace] = useState(apartment ? apartment.space : '');
    const [class_, setClass_] = useState(apartment ? apartment.class : '');
    const [status, setStatus] = useState(apartment ? apartment.status : 'disponible');
    const [price, setPrice] = useState(apartment ? apartment.price : '');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const [imagesPreview, setImagesPreview] = useState(apartment ? JSON.parse(apartment?.images) : []);
    let paths = apartment?.images ? JSON.parse(apartment.images) : [];
    useEffect(() => {
        if (lodgings.length > 0 && !city) {
            setCity(lodgings[0].city);
            setAddress(lodgings[0].address);
            setLodgingId(lodgings[0].id);
        }
    }, [lodgings]);
    //functions
    const handleLodgingChange = (id = null, data = null) => {

        if (data) {
            setCity(data.city);
            setAddress(data.address);
            return;
        }
        //filter lodgings by the id
        const lodging = lodgings.filter(lodging => lodging.id == id)[0];
        //set city and address with the current lodging
        setCity(lodging.city);
        setAddress(lodging.address);
    }
    //add
    const saveImages = async () => {
        paths = [];
        const formData = new FormData();
        let TotalImages = images.length;

        const date = new Date();
        const day = date.getDate();
        for (let i = 0; i < TotalImages; i++) {
            //get day of month
            paths.push(`http://meatmarketdanish.com/apt/storage/images/apartments/${i}-${day}-${images[i].name}`);

            formData.append('images' + i, images[i]);
            formData.append('Prefix' + i, `${i}-${day}-`);
        }

        formData.append('TotalImages', TotalImages);

        await fetch('properties/store_img', 'post', formData, localStorage.getItem('token'))
    }
    const addApartment = async () => {
        setIsLoading(true);
        await saveImages();

        const payload = {

            'lodging_id': lodgingId,
            'num_apartment': type == "appartment" ? numApartment : 0,
            'lounge': type == "appartment" ? lounge : 0,
            'room': type == "appartment" ? room : 0,
            'toilet': type == "appartment" ? toilet : 0,
            'cuisine': type == "appartment" ? cuisine : 0,
            'type': type,
            'city': city,
            'space': space,
            'class': class_,
            'address': address,
            'status': status,
            'price': price,
            'images': paths
        }

        const response = await fetch('properties', 'post', payload, localStorage.getItem('token'));
        if (response) setIsLoading(false);
        if (response.status === 200) {
            toast.notify('Appartement ajouté bien !', {
                duration: 2,
                type: "success"
            })
            setApartments(v => [...v, response.data]);
            setProperty && setProperty(response.data.id);
            setModal && setModal(false);
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
            'lodging_id': lodgingId,
            'num_apartment': type == "appartment" ? numApartment : 0,
            'lounge': type == "appartment" ? lounge : 0,
            'room': type == "appartment" ? room : 0,
            'toilet': type == "appartment" ? toilet : 0,
            'cuisine': type == "appartment" ? cuisine : 0,
            'type': type,
            'city': city,
            'space': space,
            'class': class_,
            'address': address,
            'status': status,
            'price': price,
            'images': paths,
        }


        const response = await fetch(`properties/${apartment.id}`, 'put', payload, localStorage.getItem('token'));
        if (response) setIsLoading(false);
        if (response.status === 200) {
            toast.notify('Appartement modifié bien !', {
                duration: 2,
                type: "success"
            })
            router.push('/admin');

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
            {showModal && <AddLodging setValue={setLodgingId} setShowModal={setShowModal} onCallBack={handleLodgingChange} setIsLoading={setIsLoading} />}
            <Form>
                <ToastContainer align={"right"} position={"bottom"} />
                {/* Localisations */}
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={city}
                            onChange={(e) => { setCity(e.target.value); }} />
                        <label className={classes.label}>Ville</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="address"
                            className={classes.input}
                            placeholder=" "
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                        <label className={classes.label}>Adresse</label>
                    </div>
                </TwoItemsContainer>
                {/* Type */}
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <select className={classes.select}
                            placeholder=" "
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="disponible">Disponible</option>
                            <option value="soldé">Soldé</option>
                        </select>
                        <label className={classes.label}>Statut</label>
                    </div>
                    <div className=" z-0 mb-6 w-full md:w-[49%] group">
                        <div className='flex relative items-center'>
                            <select className={classes.select + ' rounded-r-none'}
                                placeholder=" "
                                value={lodgingId}
                                onChange={(e) => { setLodgingId(e.target.value), handleLodgingChange(e.target.value) }}>
                                {lodgings.length && lodgings.map((lodging) => <option key={lodging.id} value={lodging.id}>{lodging.name}</option>)}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShowModal(true)} className="h-[34px] mt-4 w-12 rounded-r-lg bg-gray-400 duration-200 cursor-pointer hover:bg-gray-500 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <label className={classes.label}>Projet</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0  mb-6 w-full md:w-[49%] group">
                        <select className={classes.select}
                            placeholder=" "
                            value={type}
                            onChange={(e) => setType(e.target.value)}>
                            <option value="appartment">Appartment</option>
                            <option value="maison">Maison</option>
                            <option value="terrain">terrain</option>
                        </select>
                        <label className={classes.label}>Propriété</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }} />
                        <label className={classes.label}>Prix</label>
                    </div>
                </TwoItemsContainer>



                {type == 'appartment' &&
                    <>
                        <TwoItemsContainer>
                            <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                                <input type="text"
                                    className={classes.input}
                                    placeholder=" "
                                    value={numApartment}
                                    onChange={(e) => { setNumApartment(e.target.value) }} />
                                <label className={classes.label}>Num Appartement</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                                <input type="text"
                                    className={classes.input}
                                    placeholder=" "
                                    value={class_}
                                    onChange={(e) => { setClass_(e.target.value) }} />
                                <label className={classes.label}>Étage</label>
                            </div>
                        </TwoItemsContainer>
                        <TwoItemsContainer>
                            <div className="relative z-0 mb-6 w-full md:w-[24%] group">
                                <input type="text"
                                    className={classes.input}
                                    placeholder=" "
                                    value={lounge}
                                    onChange={(e) => setLounge(e.target.value)} />
                                <label className={classes.label}>Salon</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full md:w-[24%] group">
                                <input type="text"
                                    className={classes.input}
                                    placeholder=" "
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)} />
                                <label className={classes.label}>Chambres</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full md:w-[24%] group">
                                <input type="text"
                                    className={classes.input}
                                    placeholder=" "
                                    value={toilet}
                                    onChange={(e) => setToilet(e.target.value)} />
                                <label className={classes.label}>Toilettes</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full md:w-[24%] group">
                                <input type="text"
                                    className={classes.input}
                                    placeholder=" "
                                    value={cuisine}
                                    onChange={(e) => setCuisine(e.target.value)} />
                                <label className={classes.label}>Cuisine</label>
                            </div>
                        </TwoItemsContainer>
                    </>
                }
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            placeholder=" "
                            value={space}
                            onChange={(e) => { setSpace(e.target.value) }} />
                        <label className={classes.label}>superficié</label>
                    </div>

                    <div className="relative z-0 -mt-[6px] w-full md:w-[49%] group">
                        <input type="file"
                            className={classes.input}
                            placeholder=" "
                            accept='.png, .jpg, .jpeg'
                            multiple
                            onChange={(e) => { handlePreview(e) }} />
                        <label className={classes.label}>Images</label>
                    </div>
                </TwoItemsContainer>


            </Form>

            <div className='flex items-center flex-wrap gap-8 justify-center mt-6'>
                {imagesPreview && imagesPreview.map(image => {
                    return <img src={image} className='w-[100px] h-[100px] bg-white shadow-md rounded-md' alt='' key={image} />
                })}
            </div>

            <div className='flex justify-center mt-6'>
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
            </div>
        </>
    )
}


export default AddApartment