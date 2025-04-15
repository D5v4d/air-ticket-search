import { useDispatch, useSelector } from 'react-redux';
import styleNavigation from './navigation.module.scss';
import { updataTicket } from '../../../../../redux/slice/ticketsSlice';
import { RootState } from '../../../../../redux/store';
import { useState } from 'react';
import NumberOfTransfers from '../../menu/components/NumberOfTransfers';
import Company from '../../menu/components/Company';

const Navigation = () => {
  const filterData = useSelector((state: RootState) => state.filter);
  const [activeOption, setActiveOption] = useState('Самый дешевый');
  const [navigationIsOpen, setNavigationIsOpen] = useState(false)
  const dispatch = useDispatch();

  const options = ['Самый дешевый', 'Самый быстрый', 'Самый оптимальный'];

  const updateData = (name: string) => {
    setActiveOption(name);

    const filterDataActive = {
      Transfer: filterData.Transfer.filter(e => e.completed).map(e => e.name),
      Company: filterData.Company.filter(e => e.completed).map(e => e.name),
    };

    dispatch(updataTicket({ name, filterDataActive }));
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