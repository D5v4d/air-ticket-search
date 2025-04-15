import { useDispatch } from 'react-redux'
import styleAddTickets from './addTickets.module.scss'
import { addTickets } from '../../../../../redux/slice/ticketsSlice'

const AddTickets = () => {

  const dispatch = useDispatch()

  const uploadTickets = () => {
    dispatch(addTickets())
  }

  return (
    <div className={styleAddTickets.AddTickets} onClick={uploadTickets}>Загрузить еще билеты</div>
  )
}

export default AddTickets