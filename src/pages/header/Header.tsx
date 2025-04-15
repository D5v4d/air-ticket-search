import plane from '../../assets/img/plane.png'
import styleHedear from './header.module.scss'

const Header = () => {

  return (
    <header className={styleHedear.Header}>
      <img src={plane} alt="plane" />
      <span>Поиск авиабилетов</span>
    </header>
  );
};

export default Header;