import { useDispatch } from "react-redux";
import Menu from "./components/menu/Menu";
import Tickets from "./components/tickets/Tickets";
import styleMain from './main.module.scss'
import { AppDispatch } from "../../redux/store";
import { fetchTickets } from "../../redux/slice/ticketsSlice";
import { useEffect } from "react";

const Main = () => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Загружаем данные при монтировании компонента
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <main className={styleMain.Main}>
      <Menu />
      <Tickets />
    </main>
  );
};

export default Main;








// const dispatch = useDispatch<AppDispatch>();
// const todosState = useSelector((state: RootState) => state.tickets);

// useEffect(() => {
//   // Загружаем данные при монтировании компонента
//   dispatch(fetchTickets());
// }, [dispatch]);

// const handleClick = () => {
//   console.log(todosState); // Логирование текущего состояния
//   dispatch(updata())
// };