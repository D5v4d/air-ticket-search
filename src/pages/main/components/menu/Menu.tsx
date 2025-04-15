import NumberOfTransfers from './components/NumberOfTransfers'
import Company from './components/Company'
import styleMenu from './menu.module.scss'

const Menu = () => {
  return (
    <div className={styleMenu.Menu}>
      <NumberOfTransfers/>
      <Company/>
    </div>
  )
}

export default Menu