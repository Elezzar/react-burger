import PropTypes from 'prop-types';

const OrdersTotal = (props) => {
  return (
    <li>
      <h2 className="text text_type_main-medium">{props.title}</h2>
      <p className="text text_type_digits-large">{props.number}</p>
    </li>
    );
}

export default OrdersTotal;

OrdersTotal.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};