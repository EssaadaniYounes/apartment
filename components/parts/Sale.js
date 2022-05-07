import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'
import Loader from './Loader';
import Form from './Form';
import { useUserContext } from '../../context/user';
import fetch from '../../helpers/fetch-data';

const classes = {
    label: 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function Sale({ sale = null }) {

    const { apartments, clients, user, setSales } = useUserContext();
    //fields
    const [isLoading, setIsLoading] = useState(false);
    const [numSale, setNumSale] = useState(sale ? sale.num_sale : '');
    const [dateSale, setDateSale] = useState(sale ? sale.date_sale : '');
    const [clientId, setClientId] = useState(sale ? sale.client_id : '');
    const [propertyId, setPropertyId] = useState(sale ? sale.property_id : '');
    const [agreedAmount, setAgreedAmount] = useState(sale ? sale.agreed_amount : 0);
    const [paymentNature, setPaymentNature] = useState(sale ? sale.payment_nature : 'partial');
    const [paymentDate, setPaymentDate] = useState(sale ? sale.payment_date : 1);
    const [advancedAmount, setAdvancedAmount] = useState(sale ? sale.advanced_amount : 0);
    const [monthlyAmount, setMonthlyAmount] = useState(sale ? sale.monthly_amount : 0);
    const [rest, setRest] = useState(sale ? sale.rest : agreedAmount - advancedAmount);

    //functions
    const getAmount = (id) => {
        const apartment = apartments.find(apartment => apartment.id == id);
        setAgreedAmount(apartment.price);
    }

    const addSale = async () => {

        setIsLoading(true);
        const payload = {
            'client_id': clientId,
            'num_sale': numSale,
            'property_id': propertyId,
            'date_sale': dateSale,
            'advanced_amount': advancedAmount,
            'rest': rest,
            'payment_nature': paymentNature,
            'agreed_amount': agreedAmount,
            'payment_date': paymentDate,
            'monthly_amount': monthlyAmount,
        }

        const response = await fetch('sales', 'post', payload, user.token);

        if (response) setIsLoading(false);
        if (response.status === 201) {
            toast.notify('Client bien ajouté !', {
                duration: 2,
                type: "success"
            })
        } else {
            toast.notify(response.error, {
                duration: 2,
                type: "error"
            })
        };
    };

    const updateSale = async () => {
        setIsLoading(true);

        const payload = {
            'client_id': clientId,
            'num_sale': numSale,
            'property_id': propertyId,
            'date_sale': dateSale,
            'advanced_amount': advancedAmount,
            'rest': rest,
            'payment_nature': paymentNature,
            'agreed_amount': agreedAmount,
            'payment_date': paymentDate,
            'monthly_amount': monthlyAmount,
        }
        const response = await fetch(`sales/${sale.id}`, 'put', payload, user.token);
        if (response) setIsLoading(false);
        if (response.status === 200) {
            toast.notify('Client bien Modifie !', {
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
    //this method for reseting the values of payments if the nature total
    const resetValues = (value) => {
        if (value == "total") {
            setAdvancedAmount(0);
            setMonthlyAmount(0);
            setRest(agreedAmount);
            setPaymentDate(1)
        }
    }
    useEffect(() => {
        const _rest = agreedAmount - advancedAmount;
        setRest(_rest);
    }, [agreedAmount, advancedAmount])

    return (
        <>
            {isLoading && <Loader />}
            <ToastContainer align={"right"} position={"bottom"} />
            <Form>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            className={classes.input}
                            value={numSale}
                            onChange={(e) => setNumSale(e.target.value)}
                            placeholder=" " />
                        <label className={classes.label}>Num Dossier</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="date"
                            className={classes.input}
                            value={dateSale}
                            onChange={(e) => setDateSale(e.target.value)}
                            placeholder=" " />
                        <label className={classes.label}>Date Dossier</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <select className={classes.input}
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}>
                            <option disabled selected value={''}>Choisir Un Client</option>
                            {
                                clients.length && clients.map(client => {
                                    return <option value={client.id} key={client.id}>{client.name}</option>
                                })
                            }
                        </select>
                        <label className={classes.label}>Client</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <select className={classes.input}
                            value={propertyId}
                            onChange={(e) => { setPropertyId(e.target.value); getAmount(e.target.value) }}>
                            <option disabled selected value={''}>Choisir Un Propriété</option>
                            {
                                apartments.length && apartments.map(apartment => {
                                    return <option value={apartment.id} key={apartment.id}>{apartment.city}</option>
                                })
                            }
                        </select>
                        <label className={classes.label}>Propiétié</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="number"
                            className={classes.input}
                            value={agreedAmount}
                            onChange={(e) => { setAgreedAmount(e.target.value) }}
                            placeholder=" " />
                        <label className={classes.label}>Prix vente (DH)</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <select className={classes.input}
                            value={paymentNature}
                            onChange={(e) => { setPaymentNature(e.target.value); resetValues(e.target.value) }}>
                            <option value="total"> Total </option>
                            <option value="partial"> Partial </option>
                        </select>
                        <label className={classes.label}>Nature de paiment</label>
                    </div>
                </TwoItemsContainer>

                {
                    paymentNature === 'partial' && (
                        <>

                            <TwoItemsContainer>
                                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                                    <input type="number"
                                        max='31'
                                        min='1'
                                        className={classes.input}
                                        value={paymentDate}
                                        onChange={(e) => setPaymentDate(e.target.value)}
                                        placeholder=" " />
                                    <label className={classes.label}>Jour Echéance (ex: le 10 a chaque mois) </label>
                                </div>

                                <div className="relative z-0 mb-6 inline-block w-full md:w-[49%] group">
                                    <input type="number"
                                        className={classes.input}
                                        value={monthlyAmount}
                                        max={agreedAmount}
                                        onChange={(e) => setMonthlyAmount(e.target.value)}
                                        placeholder=" " />
                                    <label className={classes.label}>Mensuel</label>
                                </div>
                            </TwoItemsContainer>
                            <TwoItemsContainer>

                                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                                    <input type="number" className={classes.input}
                                        value={advancedAmount}
                                        placeholder=" "
                                        onChange={(e) => { setAdvancedAmount(e.target.value) }} />

                                    <label className={classes.label}>Montant Avancé</label>
                                </div>
                                <div className="relative z-0 mb-6 inline-block w-full md:w-[49%] group">
                                    <input type="number"
                                        className={classes.input}
                                        value={rest}
                                        readOnly
                                        placeholder=" " />
                                    <label className={classes.label}>Reste</label>
                                </div>
                            </TwoItemsContainer>
                        </>
                    )
                }
            </Form>
            <div className='flex justify-center mt-6'>
                {
                    !sale
                        ? <button onClick={() => addSale()} className="relative w-full h-[45px]  sm:w-fit inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative w-full justify-center h-full sm:text-right  sm:w-fit flex flex-row-reverse items-center px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    Ajouter
                                </span>
                            </span>
                        </button> :
                        <button onClick={() => updateSale()} className="relative w-full h-[45px]  sm:w-fit inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-red-300 to-orange-500 group-hover:from-red-300 text-orange-700 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800">
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

const TwoItemsContainer = (props) => {
    return (
        <div className="flex flex-col justify-between md:flex-row gap-4 my-3 relative">
            {props.children}
        </div>
    )
}

export default Sale