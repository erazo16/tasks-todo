import axios, { AxiosResponse } from 'axios';
import { Task } from '../../types';


export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get<Task[]>(
      'https://tasks-manager-test.fly.dev/api/Tasks',
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
      `https://tasks-manager-test.fly.dev/api/tasks/${task.id}`,
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
    await axios.delete(`https://tasks-manager-test.fly.dev/api/tasks/${id}`, {
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
      'https://tasks-manager-test.fly.dev/api/tasks',
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
