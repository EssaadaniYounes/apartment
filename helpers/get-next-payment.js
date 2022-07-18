export const getNextPayment = (client, nextPayments) => {

    const CurrentClientPayments = nextPayments.filter(p => p.client_id == client);
    let LastPaymentDate = "";
    switch (CurrentClientPayments.length) {
        case 0:
            LastPaymentDate = "";
            break;
        case 1:
            LastPaymentDate = CurrentClientPayments[0].next_payment;
            break;
        default:
            LastPaymentDate = CurrentClientPayments.filter(p => new Date(p.next_payment).getTime() == FilterPayments(CurrentClientPayments))[0].next_payment;
            break;

    }
    return LastPaymentDate;
}

const FilterPayments = (payments) => {
    let date = "";
    for (let i = 1; i < payments.length; i++) {
        const previousDate = new Date(payments[i - 1].next_payment).getTime();
        const currentDate = new Date(payments[i].next_payment).getTime();
        if (previousDate > currentDate) {
            date = previousDate;
        }
        else {
            date = currentDate;
        }
    }
    return date;
}