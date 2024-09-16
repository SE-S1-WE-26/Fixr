export const CalcTotalEarnings = (hours,rate) => {
    return hours * rate;
}

export const CalcTotalHours = (start, end) => {
    return end - start;
}

export const CalcCompanyFee = (earnings,discount) => {
    return earnings * (discount/100.0);
}

export const CalcNetAmount = (earnings,fee) => {
    return earnings - fee;
}
