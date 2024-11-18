const calculateTotalTime = (segments) => {
  return segments.reduce((sum, seg) => sum + seg.duration, 0);
};

const getCheapestTicket = (tickets) => {
  return [...tickets].sort((a, b) => a.price - b.price);
};

const getFastestTicket = (tickets) => {
  return [...tickets].sort((a, b) => {
    const totalTimeA = calculateTotalTime(a.segments);
    const totalTimeB = calculateTotalTime(b.segments);
    return totalTimeA - totalTimeB;
  });
};

const getOptimalTickets = (tickets) => {
  return [...tickets].sort((a, b) => {
    const totalTimeA = calculateTotalTime(a.segments);
    const totalTimeB = calculateTotalTime(b.segments);

    // Вычисляем соотношение цена/время
    const ratioA = a.price / totalTimeA;
    const ratioB = b.price / totalTimeB;

    return ratioA - ratioB; // Сортируем по соотношению (меньше - лучше)
  });
};

export const sortTickets = (tickets, sortType) => {
  switch (sortType) {
    case "cheap":
      return getCheapestTicket(tickets);
    case "fast":
      return getFastestTicket(tickets);
    case "optimal":
      return getOptimalTickets(tickets);
    default:
      return tickets; // Если сортировка не задана, возвращаем исходный массив
  }
};
