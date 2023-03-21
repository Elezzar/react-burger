import linkStile from './HeaderLink.module.css'

const HeaderLink = (props) => {
  return (
    <a className={`pt-4 pb-4 pl-5 pr-5 ${linkStile.link} text text_type_main-default ${props.inactive ? 'text_color_inactive' : linkStile.default}`} href="#">
      {props.children}
    </a>
  )
}

export default HeaderLink