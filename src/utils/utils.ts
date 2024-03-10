import { TIngredient } from "../services/types/types";

const setDate = (createdAt: string) => {
  const orderDate = new Date(Date.parse(createdAt));
  const timeZone = `${orderDate.getTimezoneOffset() > 0 ? `+${orderDate.getTimezoneOffset() / 60}` : orderDate.getTimezoneOffset() / 60}`;
  return ` i-GMT${timeZone}`;
};

const sumPrice = (items: string[], data: TIngredient[]) => {
  let sum = 0;
  items.forEach(item => {

    const ingredient = data.find(i => i._id === item);

    if (ingredient) {
      sum += ingredient.price;
    }
  });
  return sum;
}

export {
  setDate,
  sumPrice
}