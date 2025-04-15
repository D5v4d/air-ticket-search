import { useDispatch, useSelector } from 'react-redux';
import styleCompany from './company.module.scss'
import { RootState } from "../../../../../redux/store"
import { updataFilter } from '../../../../../redux/slice/filterSlice';

const Company = () => {
  const todosState = useSelector((state: RootState) => state.filter.Company);
  const dispatch = useDispatch()

  const checkedOpen = (id: string, category:string) => {
    dispatch(updataFilter({ id, category }))
  };

  return (
    <ul className={styleCompany.Company}>
      Компании
      {todosState.map((item) => (
        <li key={item.id} className={styleCompany.NumberOfTransfersList}>
          <input type="checkbox" checked={item.completed} hidden readOnly />
          <div className={`${styleCompany.customCheckbox}`} onClick={() => checkedOpen(item.id, "Company")}></div>
          <span onClick={() => checkedOpen(item.id, "Company")}>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default Company;

