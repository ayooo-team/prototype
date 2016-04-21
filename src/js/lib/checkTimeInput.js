'use strict';

export default function checkTimeInput (data, callback) {

    var departureHour = this.refs.departureHour.value;
    var departureMinutes = this.refs.departureMinutes.value;
    var arrivalHour = this.refs.arrivalHour.value;
    var arrivalMinutes = this.refs.arrivalMinutes.value;

    if ( departureHour && departureMinutes &&
         arrivalHour && arrivalMinutes ) {

         departureHour = parseInt(this.refs.departureHour.value, 10);
         departureMinutes = parseInt(this.refs.departureMinutes.value, 10);
         arrivalHour = parseInt(this.refs.arrivalHour.value, 10);
         arrivalMinutes = parseInt(this.refs.arrivalMinutes.value, 10);

        if ( (Math.floor(departureHour/23) && Math.floor(arrivalHour/23)) === 0 ) {

            if ( (Math.floor(departureMinutes/59) && Math.floor(arrivalHour/59)) === 0 ) {

                departureHour = departureHour <= 10 ? "0" + departureHour.toString() : departureHour.toString();
                departureMinutes = departureMinutes <= 10 ? "0" + departureMinutes.toString() : departureMinutes.toString();
                arrivalHour = arrivalHour <= 10 ? "0" + arrivalHour.toString() : arrivalHour.toString();
                arrivalMinutes = arrivalMinutes <= 10? "0" + arrivalMinutes.toString() : arrivalMinutes.toString();

                data["departureTime"] = departureHour + ":" + departureMinutes;
                data["arrivalTime"] = arrivalHour + ":" + arrivalMinutes;

                callback(data);

            } else {

                callback("incorrectMinutes");
            }
        } else {

            callback("incorrectHour");
        }
    } else {
        callback("incomplete");
    }
}
