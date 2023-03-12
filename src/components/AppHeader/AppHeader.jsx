import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import HeaderLink from '../HeaderLink/HeaderLink.jsx'

import headerStyles from './AppHeader.module.css'

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.menu}>
        <ul className={headerStyles.container}>
          <li className={headerStyles.item}>
            <HeaderLink>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default" >Конструктор</p>
            </HeaderLink>
            <HeaderLink>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive" >Лента заказов</p>
            </HeaderLink>
          </li>
          <li className={headerStyles.item}>
            <Logo />
          </li>
          <li className={headerStyles.item}>
            <HeaderLink>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </HeaderLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader