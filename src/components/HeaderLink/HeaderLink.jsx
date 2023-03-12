import linkStile from './HeaderLink.module.css'

const HeaderLink = (props) => {
  return (
    <a href="#">
      {props.children}
    </a>
  )
}

export default HeaderLink