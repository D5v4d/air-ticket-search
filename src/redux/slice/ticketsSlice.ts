import { createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import { ApiTickets } from "../../types/Api";
import { dataTickets } from "./data";
import { RootState } from "../store";


// Создаем адаптер для управления сущностями
const ticketsAdapter = createEntityAdapter<ApiTickets>();

// Асинхронное действие для получения билетов
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    // Имитация задержки (например, 1 секунда)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Возвращаем моковые данные
    return dataTickets;
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: ticketsAdapter.getInitialState({
    data: [] as ApiTickets[],
    numberTickets: 3,
    Api: false

  }),
  reducers: {
    updataTicket: (state, action) => {

      const filteredTickets = state.data.filter((ticket) => {
        const { Transfer, Company } = action.payload.filterDataActive;
      
        // Если массивы пустые, пропускаем проверку для них
        const matchTransfer = Transfer.length === 0 || Transfer.includes(ticket.connectionAmount);
        const matchCompany = Company.length === 0 || Company.includes(ticket.company);
      
        return matchTransfer && matchCompany;
      });
      state.numberTickets = 3;


      const sortedTickets = filteredTickets.sort((a, b) => {
        if (action.payload.name === "Самый быстрый") {
          const parseDuration = (duration: string): number => {
            const hours = parseInt(duration.match(/(\d+)\s*ч/)?.[1] || "0", 10) * 60;
            const minutes = parseInt(duration.match(/(\d+)\s*мин/)?.[1] || "0", 10);
            return hours + minutes;
          };
          return parseDuration(a.duration) - parseDuration(b.duration);
        } else if (action.payload.name === "Самый дешевый") {
          return a.price - b.price;
        } else if (action.payload.name === "Самый оптимальный") {
          // Функция для преобразования длительности в минуты
          const parseDuration = (duration: string): number => {
            const hours = parseInt(duration.match(/(\d+)\s*ч/)?.[1] || "0", 10) * 60;
            const minutes = parseInt(duration.match(/(\d+)\s*мин/)?.[1] || "0", 10);
            return hours + minutes;
          };
      
          // Максимальные значения для нормализации
          const maxPrice = Math.max(...filteredTickets.map((t) => t.price));
          const maxDuration = Math.max(...filteredTickets.map((t) => parseDuration(t.duration)));
      
          // Весы для цены и длительности
          const priceWeight = 0.7; // Цена важнее
          const durationWeight = 0.3; // Длительность менее важна
      
          // Сравниваем билеты по их оценке оптимальности
          const optimalityA = priceWeight * (a.price / maxPrice) + durationWeight * (parseDuration(a.duration) / maxDuration);
          const optimalityB = priceWeight * (b.price / maxPrice) + durationWeight * (parseDuration(b.duration) / maxDuration);
      
          return optimalityA - optimalityB;
        }
        return 0;
      });
      ticketsAdapter.setAll(state, sortedTickets);

    },
    addTickets: (state) => {
      if (state.numberTickets <= state.data.length) {
        state.numberTickets += 3;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => {
        console.log("2:", action.payload);
        state.data = action.payload; // Обновляем поле data
        state.Api = true
        ticketsAdapter.addMany(state, action.payload);
      })
      .addCase(fetchTickets.rejected, (_state, action) => {
        console.error("3:", action.error.message);
      });
  },
});

// Экспортируем действия
export const {updataTicket, addTickets} = ticketsSlice.actions;

// Генерация селекторов
export const {
  selectAll: selectAllTodos, // Выбирает все задачи
  selectById: selectTodoById, // Выбирает задачу по ID
  selectTotal: selectTotalTodos, // Подсчитывает общее количество задач
} = ticketsAdapter.getSelectors((state: RootState) => state.tickets);

// Экспортируем редьюсер
export default ticketsSlice.reducer;
