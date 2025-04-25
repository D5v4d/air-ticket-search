import NumberOfTransfers from './components/NumberOfTransfers'
import Company from './components/Company'
import styleMenu from './menu.module.scss'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updata } from '../../../../redux/slice/ticketsSlice';
import { RootState } from '../../../../redux/store';

const Menu = () => {
  const dispatch = useDispatch();
  const filterData = useSelector((state: RootState) => state.filter);
  
  useEffect(() => {
    // Вычисляем активные фильтры при каждом изменении состояния

    // Диспатчим действие для обновления фильтрации билетов
    dispatch(updata({ filterData }));
  }, [dispatch, filterData]);
  
  return (
    <div className={styleMenu.Menu}>
      <NumberOfTransfers/>
      <Company/>
    </div>
  )
}

export default Menu