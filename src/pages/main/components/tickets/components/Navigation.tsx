import { useDispatch, useSelector } from 'react-redux';
import styleNavigation from './navigation.module.scss';
import { updataTicket } from '../../../../../redux/slice/ticketsSlice';
import { useState } from 'react';
import NumberOfTransfers from '../../menu/components/NumberOfTransfers';
import Company from '../../menu/components/Company';
import { RootState } from '../../../../../redux/store';

const Navigation = () => {
  const [activeOption, setActiveOption] = useState('Самый дешевый');
  const [navigationIsOpen, setNavigationIsOpen] = useState(false)
  const filterData = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const options = ['Самый дешевый', 'Самый быстрый', 'Самый оптимальный'];

  const updateData = (name: string) => {
    setActiveOption(name);
    dispatch(updataTicket({ name, filterData }));
  };

  const NavigationItemsOpen = () => {
    setNavigationIsOpen(!navigationIsOpen)
  }

  return (
    <>
      <div className={styleNavigation.Navigation}>
        {options.map(option => (
          <div key={option} onClick={() => updateData(option)} className={`${styleNavigation.NavigationList} 
          ${activeOption === option && styleNavigation.NavigationListActive}`}>
            {option}
          </div>
        ))}
      </div>

      <div className={styleNavigation.NavigationFilter}>
        <div className={styleNavigation.NavigationSettings}>
          <span>Любая авиакомпания, любое кол-во пересадок</span>
          <span>Любая авиакомпания, пересадок: 0, 1, 2</span>
          <button onClick={NavigationItemsOpen}>Открыть настройки</button>
        </div>
        {navigationIsOpen &&
          <div className={styleNavigation.NavigationItems}>
            <Company />
            <NumberOfTransfers />
          </div>}
      </div>
    </>
  );
};

export default Navigation;