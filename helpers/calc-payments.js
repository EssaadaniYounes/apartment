export default function calcPayments(payments) {
    let count = 0;
    //get payments count if the payment_date is the same as current month
    payments.forEach(payment => {
        if (payment.payment_date.split('-')[1] == new Date().getMonth()+1) {
            count++;
        }
    })
    return count;
}