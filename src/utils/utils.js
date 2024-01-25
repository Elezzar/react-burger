const setDate = (createdAt) => {
  const orderDate = new Date(Date.parse(createdAt));
  const timeZone = `${orderDate.getTimezoneOffset() > 0 ? `+${orderDate.getTimezoneOffset() / 60}` : orderDate.getTimezoneOffset() / 60}`;
  return ` i-GMT${timeZone}`;
};

const sumPrice = (items, data) => {
  let sum = 0;
  items.forEach(item => {
    if (item !== null) {
      sum += data.find(ingredient => ingredient._id === item).price;
    }
  });
  return sum;
}

export {
  setDate,
  sumPrice
}