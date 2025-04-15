import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Создаем адаптер для управления сущностями

const filterSlice = createSlice({
    name: "filter",
    initialState: {
      Transfer: [
        { id: uuidv4(), name: "Без пересадок", completed: false },
        { id: uuidv4(), name: "1 пересадка", completed: false },
        { id: uuidv4(), name: "2 пересадки", completed: false },
        { id: uuidv4(), name: "3 пересадки", completed: false },
      ],
      Company: [
        { id: uuidv4(), name: "Победа", completed: false },
        { id: uuidv4(), name: "Red Wings", completed: false },
        { id: uuidv4(), name: "S7 Airlines", completed: false },
      ],
    },
    reducers: {
      updataFilter: (state, action) => {
        const id: string = action.payload.id;
        const category: keyof typeof state = action.payload.category;

        const itemToUpdate = state[category].find((item) => item.id === id);
        if (itemToUpdate) {
          itemToUpdate.completed = !itemToUpdate.completed;
        }
      },
    },
  });
  

// Экспортируем действия
export const { updataFilter } = filterSlice.actions;

// Экспортируем редьюсер
export default filterSlice.reducer;

