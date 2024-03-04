import tabsStyles from './Tabs.module.css';

import { forwardRef, RefObject } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

type TabsProps = {
  bunRef: RefObject<HTMLLIElement>;
  sauceRef: RefObject<HTMLLIElement>; 
  mainRef: RefObject<HTMLLIElement>;
  current: 'bun' | 'sauce' | 'main'; 
}

const Tabs = forwardRef((props: TabsProps, ref: React.Ref<HTMLDivElement>) => {

  const handleClick = (ref: React.RefObject<HTMLLIElement>) => {
    const parentContainer = ref.current?.parentNode as Element;
    const categoryTop = ref.current?.offsetTop;
    const parentContainerTop = parentContainer?.getBoundingClientRect().top;
    const offsetTop = categoryTop && parentContainerTop ? categoryTop - parentContainerTop - parentContainer.scrollTop : 0; 

    if (parentContainer) {
      parentContainer.scroll({
        behavior: 'smooth',
        top: parentContainer.scrollTop + offsetTop
      })
    }
  };

  return (  
    <div className={tabsStyles.container}>
      <a className={tabsStyles.link} href="/#bun">
        <Tab value="bun" active={props.current === 'bun'} onClick={() => {
          if (props.bunRef.current) {
            handleClick(props.bunRef);
          }
        }}>Булки</Tab> 
      </a>
      <a className={tabsStyles.link} href="/#sauce">
        <Tab value="sauce" active={props.current === 'sauce'} onClick={() => {
          if (props.sauceRef.current) {
            handleClick(props.sauceRef);
          }
        }}>Соусы</Tab> 
      </a>
      <a className={tabsStyles.link} href="/#main">
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