import { message, Modal } from 'antd';
import React from 'react';
import CreateForm from '../forms/formCreate';
import { createTask } from '../../helpers/api/api';

interface TaskModalProp {
  showModal: boolean;
  cancel: () => void;
  refecth: () => void;
}

const ModalCreate: React.FC<TaskModalProp> = ({
  showModal,
  cancel,
  refecth,
}) => {
  const handleCancel = () => {
    cancel();
  };

  const handleSubmit = async (formData: any) => {
    console.log('log data', formData);

    try {
      await createTask(formData);
      message.success('Tarea creadad con exito');
      refecth();
      handleCancel();
    } catch (error) {
      message.error('Error al crear la tarea.');
      console.error('Error creating task:', error);
      handleCancel();
    }
  };
  return (
    <Modal
      onCancel={cancel}
      open={showModal}
      visible={showModal}
      centered
      footer={false}
    >
      <h3>Crear tarea</h3>

      <CreateForm onSubmit={handleSubmit} />
    </Modal>
  );
};

export default ModalCreate;
