const FormatCurrency = (num) => {
    return num.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}

export default FormatCurrency;
