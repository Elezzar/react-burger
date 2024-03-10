import LoadingSpinnerStyles from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
  return (
    <div className={LoadingSpinnerStyles.box}>
      <div className={LoadingSpinnerStyles.spinner}></div>
      <p className="text text_type_main-defaul p-4">Загрузка...</p>
    </div>
  );
};

export default LoadingSpinner;