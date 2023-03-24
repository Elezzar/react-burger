import mainStyles from './Main.module.css'

const Main = (props) => {
  return (  
    <main className={mainStyles.main}>
      {props.children}
    </main>
  );
}

export default Main;