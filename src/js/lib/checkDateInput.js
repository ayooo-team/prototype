'use strict';
import checkTimeInput from './checkTimeInput.js';

export default function checkDateInput (data, callback) {

    const monthsInAYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fourDigits = /\d{4}/g;

    let departureDay = this.refs.departureDay.value;
    const departureMonth = this.refs.departureMonth.value;
    const departureYear = this.refs.departureYear.value;
    let arrivalDay = this.refs.arrivalDay.value;
    const arrivalMonth = this.refs.arrivalMonth.value;
    const arrivalYear = this.refs.arrivalYear.value;

    if ( departureDay && departureMonth && departureYear &&
         arrivalDay && arrivalMonth && arrivalYear ) {

        let departureDay = parseInt(this.refs.departureDay.value, 10);
        let arrivalDay = parseInt(this.refs.arrivalDay.value, 10);

        if ( isNaN(Math.floor(departureDay)) || isNaN(Math.floor(arrivalDay)) ) {

            callback("dateInputNaN");
        } else {
            if ( (Math.floor(departureDay/31) || Math.floor(arrivalDay/31)) !== (0) ) {

                callback("incorrectDateInput");
            } else {

                if ( (monthsInAYear.indexOf(departureMonth) <= (-1)) ||
                (monthsInAYear.indexOf(arrivalMonth) <= (-1)) ) {

                    callback("incorrectMonthInput");

                } else {

                    if (departureYear.match(fourDigits) && arrivalYear.match(fourDigits)) {

                        data["departureDate"]= departureMonth + " " + departureDay + " " + departureYear;
                        data["arrivalDate"]= arrivalMonth + " " + arrivalDay + " " + arrivalYear;

                        checkTimeInput(data, (response) => (callback(response)));

                    } else {

                        callback("incorrectYearInput");
                    }
                }
            }
        }
    } else {
        callback("incomplete");
    }
}
