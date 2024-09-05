import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  message,
  Select,
} from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface TaskFormProps {
  onSubmit: (formData: FormData) => void;
}

const CreateForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const { Option } = Select;

  const handleFinish = (values: any) => {
    const formated = values.due_date
      ? dayjs(values.due_date).format('YYYY-MM-DD')
      : '';

    onSubmit({ ...values, due_date: formated, image: imageBase64 });
  };

  const validateName = (_: any, value: string) => {
    if (!value || value.length < 3 || value.length > 50) {
      return Promise.reject('El nombre debe tener entre 3 y 50 caracteres.');
    }
    if (
      value.startsWith(' ') ||
      value.endsWith(' ') ||
      value.startsWith('_') ||
      value.endsWith('_')
    ) {
      return Promise.reject(
        'El nombre no puede iniciar o terminar con espacio o _.'
      );
    }
    return Promise.resolve();
  };

  const validateDate = (_: any, value: any) => {
    if (!value || value.isBefore(dayjs(), 'day')) {
      return Promise.reject(
        'La fecha de entrega no puede ser menor a la fecha de creación.'
      );
    }
    return Promise.resolve();
  };

  const handleImageChange = (info: UploadChangeParam<UploadFile<RcFile>>) => {
    if (info.file.status === 'done') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(info.file.originFileObj as RcFile);
    }
  };

  const handleBeforeUpload = (file: RcFile) => {
    const isValidSize = file.size / 1024 / 1024 < 2;
    if (!isValidSize) {
      message.error('El archivo debe ser menor a 2MB.');
    }
    return isValidSize;
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={{
        status: 'Por hacer',
        priority: 'Baja',
      }}
    >
      <Form.Item
        name="name"
        label="Nombre de la tarea"
        rules={[
          {
            required: true,
            message: 'Por favor ingrese el nombre de la tarea.',
          },
          { validator: validateName },
        ]}
      >
        <Input placeholder="Ingrese el nombre de la tarea" />
      </Form.Item>
      <Form.Item
        name="status"
        label="Estado de la tarea"
        rules={[
          {
            required: true,
            message: 'Por favor seleccione el estado de la tarea.',
          },
        ]}
      >
        <Select placeholder="Selecciona el estado">
          <Option value="Por hacer">Por hacer</Option>
          <Option value="En progreso">En progreso</Option>
          <Option value="Completada">Completada</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="priority"
        label="Prioridad de la tarea"
        rules={[
          {
            required: true,
            message: 'Por favor seleccione la prioridad de la tarea.',
          },
        ]}
      >
        <Select placeholder="Selecciona la prioridad">
          <Option value="Baja">Baja</Option>
          <Option value="Media">Media</Option>
          <Option value="Alta">Alta</Option>
        </Select>
      </Form.Item>

      <Form.Item name="image" label="Imagen de la tarea">
        <Upload
          customRequest={({ onSuccess }) => {
            setTimeout(() => onSuccess && onSuccess('ok'), 0);
          }}
          showUploadList={false}
          onChange={handleImageChange}
          beforeUpload={handleBeforeUpload}
        >
          <Button icon={<UploadOutlined />}>Subir Imagen</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="due_date"
        label="Fecha de entrega"
        rules={[
          {
            required: true,
            message: 'Por favor seleccione la fecha de entrega.',
          },
          { validator: validateDate },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Descripción de la tarea"
        rules={[
          {
            max: 120,
            message: 'La descripción no puede exceder los 120 caracteres.',
          },
        ]}
      >
        <Input.TextArea
          placeholder="Ingrese la descripción de la tarea"
          maxLength={120}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Crear
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateForm;
