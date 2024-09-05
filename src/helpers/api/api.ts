import axios, { AxiosResponse } from 'axios';
import { Task } from '../../types';

interface ApiResponse {
  data: Task[];
}
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get<Task[]>(
      'api/Tasks',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.log('ERROR API getInfo :', error);
    return [];
  }
};

export const updateTask = async (task: Task): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.put<Task>(
      `api/tasks/${task.id}`,
      task,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.log('ERROR API getInfo :', error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`api/tasks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('ERROR deleting task:', error);
    throw error;
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.post<Task>(
      'api/tasks',
      task,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error('ERROR creating task:', error);
    throw error;
  }
};
