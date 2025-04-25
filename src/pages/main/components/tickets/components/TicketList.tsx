import { useEffect, useRef, useState } from 'react';
// import Ticket from './Ticket'
import styleTicketList from './ticketList.module.scss'
import { Flex, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import Ticket from './Ticket';



const TicketList = () => {

  const [percent, setPercent] = useState(-50);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const apiСompleted = useSelector((state: RootState) => (state.tickets.apiLoaded));

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 22;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => clearTimeout(timerRef.current!);
  }, [percent]);



  return (
    <div className={styleTicketList.TicketList}>
      <Ticket />
      {!apiСompleted &&
        <Flex align="center" gap="middle" className={styleTicketList.ApiLoading}>
          <Spin percent={percent} size="large" />
        </Flex>
      }
    </div>
  )
}

export default TicketList