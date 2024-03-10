type OrdersTotalProps = {
  title: string;
  number: number;
}
const OrdersTotal = (props: OrdersTotalProps) => {
  return (
    <li>
      <h2 className="text text_type_main-medium">{props.title}</h2>
      <p className="text text_type_digits-large">{props.number}</p>
    </li>
    );
}

export default OrdersTotal;
