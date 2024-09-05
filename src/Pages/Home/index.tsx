import { useQuery } from '@tanstack/react-query';
import { getAllTasks, updateTask } from '../../helpers/api/api';
import { Task } from '../../types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RooState } from '../../redux/store';
import {
  setAllTasks,
  setCompleted,
  setInprogress,
  setTodo,
  takeColumn,
} from '../../redux/tasks/tasks';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Card from '../../components/card';
import ModalCreate from '../../components/modal/modalCreate';

export default function Home() {
  const columnsData = useSelector((state: RooState) => state.tasksAll.columns);
  const [showModal, setShowModal] = useState(false);

  const { data: tasks = [], refetch } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (tasks.length === 0) return;
    dispatch(setAllTasks(tasks));
    dispatch(setTodo(tasks));
    dispatch(setInprogress(tasks));
    dispatch(setCompleted(tasks));
  }, [tasks]);


  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columnsData[source.droppableId];
      const destColumn = columnsData[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      dispatch(
        takeColumn({
          ...columnsData,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        })
      );
      updateTask({ ...removed, status: destination.droppableId });
    } else {
      const column = columnsData[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      dispatch(
        takeColumn({
          ...columnsData,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        })
      );
    }
  };

  return (
    <>
      <button className="ml-4" onClick={() => setShowModal(true)}>
        crear tarea
      </button>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className="flex flex-wrap justify-around">
          <div className="m-32  flex justify-around w-full min-h-96">
            {Object.entries(columnsData).map(([columnId, column], _) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, _) => (
                    <div
                      className="min-h-full flex bg-[#2a2b2b] flex-col min-w-80 rounded-md p-4 mr-11"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h3>{column?.title}</h3>
                      {column.items.map((el, index) => (
                        <Card item={el} index={index} refetch={refetch} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>
      <ModalCreate
        showModal={showModal}
        cancel={() => setShowModal(false)}
        refecth={refetch}
      />
    </>
  );
}
