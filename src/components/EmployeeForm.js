import React, {useState, useEffect} from 'react';
import { Form, Input, Modal } from 'antd';
import { infoTable, skipSameValues } from '../utils/functions';
import { saveEmployee, updateEmployee } from '../service/api';

export const EmployeeForm = ({
  initialState,
  oEmployee,
  isModalVisible,
  isNotSearching,
  setIsNotSearching,
  form,
  handleCancel,
  handleData,
  title,
  token
}) => {
  const [employee, setEmployee] = useState(initialState);

  useEffect(() => {
    if (oEmployee) {
      setEmployee(oEmployee);
    }
  }, [oEmployee]);

  const getInputForm = ({ target }) => {
    const { name, value } = target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const save = async () => {
    let oSend = { ...employee };
    let oResponse;
    if(!oSend.id){
      oResponse = await saveEmployee(oSend, token);
      infoTable(oResponse, handleCancel, handleData);
    }
    else{
      let oUpdatedValues = skipSameValues(oEmployee, oSend);
      oResponse = await updateEmployee(oUpdatedValues, token);
      infoTable(oResponse, handleCancel, handleData);
      setIsNotSearching(!isNotSearching);
      form.resetFields();
    }
    
  };

  return(
    <Modal
      afterClose={() => setEmployee(initialState)}
      onCancel={handleCancel}
      onOk={save}
      title={title}
      visible={isModalVisible}
    >
      <Form 
        layout="vertical"
      >
        <Form.Item 
          label="Nombre(s)" 
          extra="Limite de 30 caracteres"
        >
          <Input
            type="text"
            name="first_name"
            value={employee.first_name}
            maxLength={30}
            onChange={getInputForm}
            rules={[
              {
                required: true,
                message: 'Ingresa un nombre',
              },
            ]}
          />
        </Form.Item>
        <Form.Item 
          label="Apellido(s)"
          extra="Limite de 30 caracteres"
        >
          <Input
            type="text"
            name="last_name"
            maxLength={30}
            value={employee.last_name}
            onChange={getInputForm}
          />
        </Form.Item>
        <Form.Item label="Número de telefono">
          <Input
            type="number"
            name="phone_number"
            value={employee.phone_number}
            onChange={getInputForm}
          />
        </Form.Item>
        <Form.Item 
          label="Correo Electronico"
          extra="Limite de 75 caracteres"
        >
          <Input
            type="email"
            name="email"
            maxLength={75}
            value={employee.email}
            onChange={getInputForm}
          />
        </Form.Item>
        <Form.Item 
          label="Dirección"
          extra="Limite de 100 caracteres"
        >
          <Input
            type="text"
            name="address"
            maxLength={100}
            value={employee.address}
            onChange={getInputForm}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
