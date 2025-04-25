import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { ApiTickets } from "../../types/Api";
import { dataTickets } from "./data";
import { RootState } from "../store";

interface FilterItem {
  id: string;
  name: string;
  completed: boolean;
}

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
    data: [] as ApiTickets[], // Исходные данные
    numberTickets: 3,
    apiLoaded: false,
    sortType: 'Самый дешевый', // Текущий тип сортировки
  }),
  reducers: {
    updata: (state, action) => {
      state.numberTickets = 3
      const filterDataActive = {
        Transfer: action.payload.filterData.Transfer.filter((e: FilterItem) => e.completed).map((e: FilterItem) => e.name),
        Company: action.payload.filterData.Company.filter((e: FilterItem) => e.completed).map((e: FilterItem) => e.name),
      };

      // Фильтруем исходные данные
      let filteredTickets = state.data.filter((ticket) => {
        const matchTransfer = filterDataActive.Transfer.length === 0 || filterDataActive.Transfer.includes(ticket.connectionAmount);
        const matchCompany = filterDataActive.Company.length === 0 || filterDataActive.Company.includes(ticket.company);

        return matchTransfer && matchCompany;
      });

        filteredTickets = applySort(filteredTickets, state.sortType);

      // Обновляем state.entities новым массивом
      ticketsAdapter.setAll(state, [...filteredTickets]);
    },
    updataTicket: (state, action) => {
      // Получаем текущие данные из state.entities
      const currentTickets = Object.values(state.entities);

      // Сохраняем тип сортировки
      state.sortType = action.payload.name;

      // Сортируем данные
      const sortedTickets = applySort(currentTickets, action.payload.name);

      // Обновляем state.entities новым массивом
      ticketsAdapter.setAll(state, [...sortedTickets]);
    },
    addTickets: (state) => {
      const currentTickets = Object.values(state.entities);
      if (state.numberTickets <= currentTickets.length) {
        state.numberTickets += 3;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => {
        console.log("2:", action.payload);
        state.apiLoaded = true;
        state.data = action.payload; // Сохраняем исходные данные
        ticketsAdapter.addMany(state, action.payload); // Добавляем в state.entities
      })
      .addCase(fetchTickets.rejected, (_state, action) => {
        console.error("3:", action.error.message);
      });
  },
});

// Функция для применения сортировки
const applySort = (tickets: ApiTickets[], sortType: string): ApiTickets[] => {
  return [...tickets].sort((a, b) => {
    if (sortType === "Самый быстрый") {
      const parseDuration = (duration: string): number => {
        const hours = parseInt(duration.match(/(\d+)\s*ч/)?.[1] || "0", 10) * 60;
        const minutes = parseInt(duration.match(/(\d+)\s*мин/)?.[1] || "0", 10);
        return hours + minutes;
      };
      return parseDuration(a.duration) - parseDuration(b.duration);
    } else if (sortType === "Самый дешевый") {
      return a.price - b.price;
    } else if (sortType === "Самый оптимальный") {
      const parseDuration = (duration: string): number => {
        const hours = parseInt(duration.match(/(\d+)\s*ч/)?.[1] || "0", 10) * 60;
        const minutes = parseInt(duration.match(/(\d+)\s*мин/)?.[1] || "0", 10);
        return hours + minutes;
      };

      const maxPrice = Math.max(...tickets.map((t) => t.price));
      const maxDuration = Math.max(...tickets.map((t) => parseDuration(t.duration)));

      const priceWeight = 0.7;
      const durationWeight = 0.3;

      const optimalityA = priceWeight * (a.price / maxPrice) + durationWeight * (parseDuration(a.duration) / maxDuration);
      const optimalityB = priceWeight * (b.price / maxPrice) +  durationWeight * (parseDuration(b.duration) / maxDuration);

      return optimalityA - optimalityB;
    }
    return 0;
  });
};

// Экспортируем действия
export const { updataTicket, addTickets, updata } = ticketsSlice.actions;

// Генерация селекторов
export const {
  selectAll: selectAllTickets, // Выбирает все билеты
  selectById: selectTicketById, // Выбирает билет по ID
  selectTotal: selectTotalTickets, // Подсчитывает общее количество билетов
} = ticketsAdapter.getSelectors((state: RootState) => state.tickets);

// Экспортируем редьюсер
export default ticketsSlice.reducer;
