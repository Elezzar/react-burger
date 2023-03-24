import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import HeaderLink from '../HeaderLink/HeaderLink.jsx'

import headerStyles from './AppHeader.module.css'

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.menu}>

        <div className={headerStyles.item}>
          <HeaderLink>
            <BurgerIcon type="primary" /> Конструктор
          </HeaderLink>
          <HeaderLink inactive>
            <ListIcon type="secondary" /> Лента заказов
          </HeaderLink>
        </div>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <div className={headerStyles.item}>
          <HeaderLink inactive>
            <ProfileIcon type="secondary" /> Личный кабинет
          </HeaderLink>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader