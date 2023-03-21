import React from "react";

import constructorStyles from './BurgerConstructor.module.css'

import { ConstructorElement, 
  DragIcon, 
  Button, 
  CurrencyIcon } 
  from '@ya.praktikum/react-developer-burger-ui-components';

  import Modal from "../Modal/Modal";
  import ModalOrder from "../ModalOrder/ModalOrder";

const BurgerConstructor = (props) => {
  const [open, setOpen] = React.useState(false)

  const showModal = () => {
    setOpen(true);
  }

  const hideModal = () => {
    setOpen(false);
  }

  return (  
    <section className={constructorStyles.section}>
      <ul className={`pl-4 ${constructorStyles.list}`}>
        <li className={constructorStyles.item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Флюоресцентная булка R2-D3 (верх)"
            price={988}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
          />
        </li>
        <li className={constructorStyles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Мини-салат Экзо-Плантаго"
            price={4400}
            thumbnail={'https://code.s3.yandex.net/react/code/salad.png'}
          />
        </li>
        <li className={constructorStyles.item}>
          <DragIcon type="primary" /> 
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={1337}
            thumbnail={'https://code.s3.yandex.net/react/code/meat-02.png'}
          />
        </li>
        <li className={constructorStyles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Соус с шипами Антарианского плоскоходца"
            price={88}
            thumbnail={'https://code.s3.yandex.net/react/code/sauce-01.png'}
          />
        </li>
        <li className={constructorStyles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Мини-салат Экзо-Плантаго"
            price={4400}
            thumbnail={'https://code.s3.yandex.net/react/code/salad.png'}
          />
        </li>
        <li className={constructorStyles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Соус с шипами Антарианского плоскоходца"
            price={88}
            thumbnail={'https://code.s3.yandex.net/react/code/sauce-01.png'}
          />
        </li>
        <li className={constructorStyles.item}>
          <DragIcon type="primary" /> 
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={1337}
            thumbnail={'https://code.s3.yandex.net/react/code/meat-02.png'}
          />
        </li>
        <li className={constructorStyles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Мини-салат Экзо-Плантаго"
            price={4400}
            thumbnail={'https://code.s3.yandex.net/react/code/salad.png'}
          />
        </li>
        <li className={constructorStyles.item}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Флюоресцентная булка R2-D3 (низ)"
            price={988}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
          />
        </li>
      </ul>
      <div className={`pr-4 ${constructorStyles.order}`}>
        <div className={constructorStyles.price}>
        <p className='text text_type_digits-medium'>7801</p>
          <CurrencyIcon type={'primary'} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={showModal}>
          Оформить заказ
        </Button>
      </div>

      {open && (
          <Modal closePopup={hideModal}>
            <ModalOrder />
          </Modal>
        )}
    </section>
  );
}

export default BurgerConstructor;