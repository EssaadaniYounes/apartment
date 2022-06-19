import React, { useState, useRef, useEffect } from 'react'
import Form from './Form'

import { toast, ToastContainer } from 'react-nextjs-toast'
import { Loader, TwoItemsContainer } from './';
import { useUserContext } from '../../context/user';
import fetch from '../../helpers/fetch-data';
import CurrentDay from '../../helpers/today';
const classes = {
    label: 'absolute text-[18px]-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}

function Payment({ payment = null, saleDetails = null }) {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentDate, setPaymentDate] = useState(payment ? payment.payment_date : CurrentDay());
    const [paymentType, setPaymentType] = useState(payment ? payment.payment_type : '');
    const [amount, setAmount] = useState(payment ? payment.amount : '');
    const [nextPayment, setNextPayment] = useState(payment ? payment.next_payment : '');
    const [saleId, setSaleId] = useState(payment ? payment.sale_id : '');

    const [client, setClient] = useState(saleDetails?.name);
    const [property, setProperty] = useState(saleDetails?.city || '');
    const [agreedAmount, setAgreedAmount] = useState(saleDetails?.agreed_amount || 0);
    const [rest, setRest] = useState(saleDetails?.rest || 0);
    const [total, setTotal] = useState(+saleDetails?.agreed_amount - rest);
    const [monthlyAmount, setMonthlyAmount] = useState(saleDetails?.monthly_amount || '');

    const { sales } = useUserContext();

    useEffect(() => {
        const sale = sales.find(sale => sale.id == saleId);

        if (sale) {
            setClient(sale.name)
            setProperty(sale.city);
            setAgreedAmount(sale.agreed_amount);
            setRest(sale.rest - amount);
            setTotal(+sale.agreed_amount - rest)
        }

    }, [saleId, amount])


    const addPayment = async () => {
        setIsLoading(true);
        const body = {
            payment_date: paymentDate,
            payment_type: paymentType,
            amount: amount,
            next_payment: nextPayment,
            sale_id: saleId
        }

        const response = await fetch('payments', 'post', body, localStorage.getItem('token'));
        const payload = {
            'rest': rest,
        }

        const res = await fetch(`sales/sale/${saleId}`, 'put', payload, localStorage.getItem('token'));
        if (res && response) {
            toast.notify('Payment ajouté avec succès', { duration: 2, type: 'success' });
        }
        setIsLoading(false);
    }
    const updatePayment = async () => {
        setIsLoading(true);
        const body = {
            payment_date: paymentDate,
            payment_type: paymentType,
            amount: amount,
            next_payment: nextPayment,
            sale_id: saleId
        }

        const response = await fetch(`payments/${payment.id}`, 'put', body, localStorage.getItem('token'));
        const payload = {
            'rest': rest,
        }

        const res = await fetch(`sales/sale/${saleId}`, 'put', payload, localStorage.getItem('token'));
        if (res && response) {
            toast.notify('Payment modifié avec succès', { duration: 2, type: 'success' });
        }
        setIsLoading(false);
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className="absolute z-10 -top-[100px] bg-red-400">
                <ToastContainer />
            </div>
            <Form>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            className={classes.input}
                            placeholder=" " />
                        <label className={classes.label}>Date Payment</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <select value={paymentType} onChange={(e) => { setPaymentType(e.target.value) }} className={classes.input}>
                            <option value="" disabled>Choisir un type de paiement</option>
                            <option value="cash">Espèce</option>
                            <option value="cheque">Chèque</option>
                            <option value="virement">Virement</option>
                        </select>
                        <label className={classes.label}>Type de paiement</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <select className={classes.input} value={saleId} onChange={(e) => { setSaleId(e.target.value) }}>
                            <option value="" defaultChecked={true}>Choisir la vente</option>
                            {sales.map(sale => <option value={sale.id} key={sale.id}>{sale.city + ' / ' + sale.name}</option>)}
                        </select>
                        <label className={classes.label}>Dossier</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            value={client}
                            className={classes.input} readOnly />
                        <label className={classes.label}>Client</label>
                    </div>
                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="number"
                            onChange={(e) => { setAmount(e.target.value) }}
                            value={amount}
                            className={classes.input}
                            placeholder=" " />
                        <label className={classes.label}>Montant</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="date"
                            placeholder=" "
                            value={nextPayment}
                            onChange={(e) => setNextPayment(e.target.value)}
                            className={classes.input} />
                        <label className={classes.label}>Prochain échiance </label>
                    </div>

                </TwoItemsContainer>
                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            value={property}
                            className={classes.input} readOnly />
                        <label className={classes.label}>Propriété</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            value={agreedAmount}
                            className={classes.input} readOnly />
                        <label className={classes.label}>Prix de vente</label>
                    </div>
                </TwoItemsContainer>

                <TwoItemsContainer>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            value={agreedAmount - rest}
                            className={classes.input} readOnly />
                        <label className={classes.label}>total payé</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                        <input type="text"
                            value={rest}
                            className={classes.input} readOnly />
                        <label className={classes.label}>Reste</label>
                    </div>
                </TwoItemsContainer>
            </Form>
            <div className='flex justify-center mt-6'>
                {
                    !payment
                        ? <button onClick={() => addPayment()} className="relative w-full h-[45px]  sm:w-fit inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative w-full justify-center h-full sm:text-right  sm:w-fit flex flex-row-reverse items-center px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    Ajouter
                                </span>
                            </span>
                        </button> :
                        <button onClick={() => updatePayment()} className="relative w-full h-[45px]  sm:w-fit inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-red-300 to-orange-500 group-hover:from-red-300 text-orange-700 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800">
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



export default Payment