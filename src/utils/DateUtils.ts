export const yearListArray = (startYear: number, EndYear: number): Array<string> => {
    const list_of_years: Array<string> = []

    if (startYear >= 2000 && EndYear <= 2100) {
        // return list_of_years;
        for (let i = startYear; i <= EndYear; i++) {
            list_of_years.push(String(i))
        }
    }

    return list_of_years

}