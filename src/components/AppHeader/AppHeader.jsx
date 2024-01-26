import { NavLink, useLocation } from 'react-router-dom'

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import headerStyles from './AppHeader.module.css'

const AppHeader = () => {
  const location = useLocation();

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.menu}>

        <div className={headerStyles.item}>
          <NavLink to="/" className={headerStyles.navlink}>
            <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} /> 
            <p className={`text text_type_main-default pl-2 ${location.pathname === "/" ? '' : "text_color_inactive"}`}>Конструктор</p>
          </NavLink>
          <NavLink to="/feed" className={headerStyles.navlink}>
            <ListIcon type={location.pathname === "/feed" ? "primary" : "secondary"} /> 
            <p className={`text text_type_main-default pl-2 ${location.pathname === "/feed" ? '' : "text_color_inactive"}`}>Лента заказов</p>
          </NavLink>
        </div>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <div className={headerStyles.item}>
          <NavLink to="profile" className={headerStyles.navlink}>
            <ProfileIcon type={location.pathname === "/profile" ? "primary" : "secondary"} /> 
            <p className={`text text_type_main-default pl-2 ${location.pathname.includes("/profile") ? '' : "text_color_inactive"}`}>Личный кабинет</p>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader