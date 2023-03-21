import tabsStyles from './Tabs.module.css'

import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const Tabs = () => {
  const [current, setCurrent] = useState('bun')

  return (  
    <div className={tabsStyles.container}>
      <a className={tabsStyles.link} href='#'>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab> 
      </a>
      <a className={tabsStyles.link} href='#'>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab> 
      </a>
      <a className={tabsStyles.link} href='#'>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab> 
      </a>
    </div>
  );
}
 
export default Tabs;