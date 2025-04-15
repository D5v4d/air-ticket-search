import { RootState } from '../../../../../redux/store';
import styleTicket from './ticket.module.scss'
import { useSelector } from 'react-redux';
import redWings from "../../../../../assets/img/red-wings.png"
import s7 from "../../../../../assets/img/s7.png"
import victory from "../../../../../assets/img/victory.png"



const Ticket = () => {

  const ticketsState = useSelector((state: RootState) => (state.tickets.entities));
  const numberTickets = useSelector((state: RootState) => (state.tickets.numberTickets));
  const companyLogos = {
    "S7 Airlines": s7,
    "Red Wings": redWings,
    "Победа": victory,
  };

  
  return (
    Object.values(ticketsState).map((e, index) => (
      index < numberTickets &&
      <div key={e.id} className={styleTicket.Ticket}>
        <span className={styleTicket.Price}>{new Intl.NumberFormat('ru-RU').format(e.price)} {e.currency}</span>
        <img className={styleTicket.Logo} src={companyLogos[e.company as "S7 Airlines" | "Red Wings" | "Победа"]} alt={e.company} />
        <span className={styleTicket.FromTo}>{`${e.from} - ${e.to}`} </span>
        <span className={styleTicket.Ways}>В пути</span>
        <span className={styleTicket.Тransfers}>Пересадки</span>
        <span className={styleTicket.Time}>{e.time}</span>
        <span className={styleTicket.Durations}>{e.duration}</span>
        <span className={styleTicket.ConnectionAmount}>{e.connectionAmount}</span>
      </div>
    ))
    
  )
}

export default Ticket








// const { createRoot } = ReactDOM;

// const { Flex, Spin } = antd;

// const App = () => {
//   const [percent, setPercent] = React.useState(-50);
//   const timerRef = React.useRef(null);

//   React.useEffect(() => {
//     timerRef.current = setTimeout(() => {
//       setPercent(v => {
//         const nextPercent = v + 5;
//         return nextPercent > 150 ? -50 : nextPercent;
//       });
//     }, 100);
//     return () => clearTimeout(timerRef.current);
//   }, [percent]);

//   return (
//     <Flex align="center">
//       <Spin percent={percent} size="large" />
//     </Flex>
//   );
// };

// createRoot(mountNode).render(<App />);