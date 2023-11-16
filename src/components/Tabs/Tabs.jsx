import tabsStyles from './Tabs.module.css'

import { forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const Tabs = forwardRef((props, ref) => {

  const handleClick = (ref) => {
    const parentContainer = ref.current.parentNode;
    const categoryTop = ref.current.offsetTop;
    const parentContainerTop = parentContainer.getBoundingClientRect().top;
    const offsetTop = categoryTop - parentContainerTop - parentContainer.scrollTop;

    parentContainer.scroll({
      behavior: 'smooth',
      top: parentContainer.scrollTop + offsetTop
    })
  };

  return (  
    <div className={tabsStyles.container}>
      <a className={tabsStyles.link}>
        <Tab value="bun" active={props.current === 'bun'} onClick={() => {
          if (props.bunRef.current) {
            handleClick(props.bunRef);
          }
        }}>Булки</Tab> 
      </a>
      <a className={tabsStyles.link}>
        <Tab value="sauce" active={props.current === 'sauce'} onClick={() => {
          if (props.sauceRef.current) {
            handleClick(props.sauceRef);
          }
        }}>Соусы</Tab> 
      </a>
      <a className={tabsStyles.link}>
        <Tab value="main" active={props.current === 'main'} onClick={() => {
          if (props.mainRef.current) {
            handleClick(props.mainRef);
          }
        }}>Начинки</Tab> 
      </a>
    </div>
  );
})

export default Tabs;