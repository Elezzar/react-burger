import NotFoundPageStyles from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return ( 
    <main className={NotFoundPageStyles.main}>
      <p className={'text text_type_digits-large'}>404</p>
      <p className={'text text_type_main-medium'}>Страница не найдена</p>
    </main>
  );
}

export default NotFoundPage;