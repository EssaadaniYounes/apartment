export const getNextPayment = (client, nextPayments) => {
    console.log(nextPayments, client);
    //translate there's no payment for this client to french and assign it to payment variable
    let payment = "";
    const nextPayment = nextPayments.filter(payment => payment.client_id == client);
    //get a payment if the next_payment in nextPayment array is the bigger date
    if (nextPayment.length > 0) {
        payment = nextPayment.reduce((acc, cur) => {
            return new Date(acc.next_payment) > new Date(cur.next_payment) ? acc.next_payment : cur.next_payment;
        });
    }
    return payment[0];

}