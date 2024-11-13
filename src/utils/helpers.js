export const getDepartureTime = (date) => {
  const fullDate = new Date(date);
  const hours = fullDate.getHours();
  const minutes = fullDate.getMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return {
    hours,
    minutes,
    departureTime: `${formattedHours}:${formattedMinutes}`,
  };
};

export const getArrivalTime = (duration, date) => {
  const { hours: departureHours, minutes: departureMinutes } =
    getDepartureTime(date);

  const totalDepartureMinutes = departureHours * 60 + departureMinutes;
  const totalArrivalMinutes = totalDepartureMinutes + duration;

  const arrivalHours = Math.floor(totalArrivalMinutes / 60) % 24;
  const arrivalMinutes = totalArrivalMinutes % 60;

  const formattedArrivalHours = arrivalHours.toString().padStart(2, "0");
  const formattedArrivalMinutes = arrivalMinutes.toString().padStart(2, "0");

  const arrivalTime = `${formattedArrivalHours}:${formattedArrivalMinutes}`;
  return arrivalTime;
};

export const getTotalTravelTime = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const totalTravelTime = `${formattedHours}ч ${formattedMinutes}м`;
  return totalTravelTime;
};

export const getHeaderForCitiesWithTransfers = (stops) => {
  const stopLength = stops.length;
  let header = "";
  if (stopLength === 0) {
    header = "Без пересадок";
  } else if (stopLength === 1) {
    header = `${stopLength} пересадка`;
  } else if (stopLength > 0 && stopLength < 5) {
    header = `${stopLength} пересадки`;
  } else if (stopLength > 4) {
    header = `${stopLength} пересадок`;
  }
  return header;
};

export const getPriceString = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
