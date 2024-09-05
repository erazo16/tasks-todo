import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../types';
import { CiWarning } from 'react-icons/ci';
import { FaClock, FaEye, FaRegTrashAlt } from 'react-icons/fa';
import {  message } from 'antd';
import { deleteTask } from '../../helpers/api/api';
import ModalView from '../modal/modalView';

interface TaskCardProps {
  index: number;
  item: Task;
  refetch: () => void;
}

const Card: React.FC<TaskCardProps> = ({ item, index, refetch }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showModal, setShowModal] = useState(false);

  const info = () => {
    messageApi.info('Tarea eliminada');
  };

  const deleteTaskId = async (id: string) => {
    try {
      await deleteTask(id);
      refetch();
      info();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      {contextHolder}
      <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="mt-10 rounded-lg bg-[#f2f4f4]">
              {item.image && (
                <img src={item.image} alt="picture" className="w-full h-40" />
              )}

              <div className="p-3">
                <h6 className="mt-3 font-semibold text-gray-700">
                  {item.name}
                </h6>

                <div className="flex mt-3  justify-between">
                  <div className="flex gap-1">
                    <div className=" border text-blue-950 flex items-center  gap-1 font-semibold bg-blue-400 p-2 rounded-lg">
                      <CiWarning className="text-blue-950" />
                      <small>{item.priority}</small>
                    </div>

                    <div className="border flex items-center gap-2 text-gray-600 p-2 rounded-lg">
                      <FaClock />
                      <small>{item.due_date}</small>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaEye
                      className="text-blue-950 cursor-pointer"
                      onClick={() => setShowModal(true)}
                    />
                    <FaRegTrashAlt
                      className="text-red-500 cursor-pointer"
                      onClick={() => deleteTaskId(item.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <ModalView
        showModal={showModal}
        cancel={() => setShowModal(false)}
        item={item}
      />
    </>
  );
};

export default Card;
