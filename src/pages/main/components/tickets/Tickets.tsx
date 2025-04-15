import AddTickets from './components/AddTickets'
import Navigation from './components/Navigation'
import TicketList from './components/TicketList'
import styleTickets from './tickets.module.scss'

const Tickets = () => {
  return (
    <div className={styleTickets.Tickets}>
      <Navigation/>
      <TicketList/>
      <AddTickets/>
    </div>
  )
}

export default Tickets