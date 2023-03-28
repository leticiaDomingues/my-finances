const currencyFormatter = (num: number, currency: string = 'R$', digits: number = 2) =>
    `${currency} ${num.toFixed(digits)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

export {
    currencyFormatter
};