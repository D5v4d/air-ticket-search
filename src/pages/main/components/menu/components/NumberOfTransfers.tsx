import { useDispatch, useSelector } from 'react-redux';
import styleNumberOfTransfers from './numberOfTransfers.module.scss';
import { RootState } from "../../../../../redux/store"
import { updataFilter } from '../../../../../redux/slice/filterSlice';

const NumberOfTransfers = () => {
  const todosState = useSelector((state: RootState) => state.filter.Transfer);
  const dispatch = useDispatch()

  const checkedOpen = (id: string, category:string) => {
    dispatch(updataFilter({ id, category }))
  };

  return (
    <ul className={styleNumberOfTransfers.NumberOfTransfers}>
      Количество пересадок
      {todosState.map((item) => (
        <li key={item.id} className={styleNumberOfTransfers.NumberOfTransfersList}>
          <input type="checkbox" checked={item.completed} hidden readOnly />
          <div className={`${styleNumberOfTransfers.customCheckbox}`} onClick={() => checkedOpen(item.id, "Transfer")}></div>
          <span onClick={() => checkedOpen(item.id, "Transfer")}>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default NumberOfTransfers;