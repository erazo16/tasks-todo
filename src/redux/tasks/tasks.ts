import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';

interface TaskState {
  tasks: Task[];
  columns: Columns;
  filterTasks: Task[];
  filters: {
    search: string;
    status: string;
    priority: string;
  };
}

interface Column {
  title: string;
  items: Task[];
}

interface Columns {
  [key: string]: Column;
}

enum status {
  TODO = 'Por hacer',
  INPROGRESS = 'En progreso',
  COMPLETED = 'Completada',
}

const initialState: TaskState = {
  tasks: [],
  columns: {
    [status.TODO]: {
      title: 'Por hacer',
      items: [],
    },
    [status.INPROGRESS]: {
      title: 'En progreso',
      items: [],
    },
    [status.COMPLETED]: {
      title: 'Completed',
      items: [],
    },
  },
  filterTasks: [],
  filters: {
    search: '',
    status: '',
    priority: '',
  },
};

const taskasSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    setTodo: (state, action: PayloadAction<Task[]>) => {
      state.columns[status.TODO].items = action.payload.filter(
        (el) => el.status === status.TODO
      );
    },
    setInprogress: (state, action: PayloadAction<Task[]>) => {
      state.columns[status.INPROGRESS].items = action.payload.filter(
        (el) => el.status === status.INPROGRESS
      );
    },
    setCompleted: (state, action: PayloadAction<Task[]>) => {
      state.columns[status.COMPLETED].items = action.payload.filter(
        (el) => el.status === status.COMPLETED
      );
    },
    updateStatusTasks: (
      state,
      action: PayloadAction<{ IdT: string; newStatus: string }>
    ) => {
      const { IdT, newStatus } = action.payload;
      const newTasks = state.tasks.find((item) => item?.id === IdT);
      if (newTasks) {
        newTasks.status = newStatus;
      }
    },
    takeColumn: (state, action: PayloadAction<Columns>) => {
      state.columns = action.payload;
    },
    applyFilters: (state) => {
      const { search, status, priority } = state.filters;
      state.filterTasks = state.tasks.filter((el) => {
        const findName = search
          ? el.name.toLowerCase().includes(search.toLowerCase())
          : true;
        const filterStatus = status ? el.status === status : true;
        const filterPriority = priority ? el.priority === priority : true;
        return findName && filterStatus && filterPriority;
      });
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setPriority: (state, action: PayloadAction<string>) => {
      state.filters.priority = action.payload;
    },
  },
});

export const {
  setAllTasks,
  updateStatusTasks,
  setTodo,
  setInprogress,
  setCompleted,
  takeColumn,
  applyFilters,
  setSearch,
  setPriority,
  setStatus,
} = taskasSlice.actions;
export default taskasSlice.reducer;
