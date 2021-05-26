import React from 'react';
import { Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const renderActionColumn = (
  record,
  onEdit,
  onDelete
) => {
  return (
    <>
      <Button
        onClick={() => onEdit(record.id)}
      >
        <EditOutlined />
      </Button>
      <Popconfirm
        title="Está seguro de eliminar este empleado?"
        onConfirm={() => onDelete(record.id)}
        okText="Si"
        cancelText="No"
      >
        <Button>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </>
  );
};