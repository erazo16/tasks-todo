import { Modal, Tag } from 'antd';
import React from 'react';
import { Task } from '../../types';
import { MdOutlineDescription } from 'react-icons/md';

interface TaskModalProp {
  showModal: boolean;
  cancel: () => void;
  item: Task;
}

const ModalView: React.FC<TaskModalProp> = ({ showModal, cancel, item }) => {
  return (
    <Modal
      onCancel={cancel}
      open={showModal}
      visible={showModal}
      centered
      footer={false}
      width={550}
    >
      <h3 className="mt-6">{item.name}</h3>

      <p>
        En lista: <strong>{item.status}</strong>
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Tag color="magenta">Prioridad: {item.priority}</Tag>
        <Tag color="volcano">Estado: {item.status}</Tag>
        <Tag color="lime">Fecha entrega: {item.due_date}</Tag>
      </div>

      {item.image && <img src={item.image} alt="photo" />}

      <h4 className="flex gap-2 items-center mt-6">
        <MdOutlineDescription /> Descripcion
      </h4>
      <label>{item.description}</label>
    </Modal>
  );
};

export default ModalView;
