import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Breadcrumb, Col, Form, Input, Layout, Menu, message, Row, Select, Table } from 'antd';
import {  EmployeeForm, renderActionColumn } from '../../components';
import { infoDelete } from '../../utils/functions';
import { getEmployees, deleteEmployee } from '../../service/api';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const formatNumber = (str) => {
  let cleaned = ('' + str).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };
  return null
};

const columns = (onEdit, onDelete) => [
  {
    title: "Nombre",
    dataIndex: "first_name",
    key: "first_name",
    responsive: ['md']
  },
  {
    title: "Apellido(s)",
    dataIndex: "last_name",
    key: "last_name",
    responsive: ['md']
  },
  {
    title: "Telefono",
    dataIndex: "phone_number",
    key: "phone_number",
    responsive: ['md'],
    render: (phone) => {
      let charList = [];;
      for (let char of phone){
        charList.push(char);
      }
      return formatNumber(charList.join(""));
    }
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ['md']
  },
  {
    title: "Dirección",
    dataIndex: "address",
    key: "address",
    responsive: ['md']
  },
  {
    title: 'Acciones',
    responsive: ['md'],
    render: record => renderActionColumn(record, onEdit, onDelete)
  }
];

const initialState = {
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  address: '',
};

export const CRUDScreen = () =>  {
  const [employees, setEmployees] = useState([]);
  const [oEmployee, setEmployee] = useState(initialState);
  const [token, setToken] = useState(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotSearching, setIsNotSearching] = useState(true);

  const handleData = async () => {
    let response = await getEmployees(token);
    if (response.status === 200) {
      let { message } = response.data;
      if (message.length) {
        setEmployees(message);
      }
    }
  };

  useEffect(() => {
    if (!employees.length){
      let token = window.localStorage.getItem("token");
      if(token){
        setToken(token);
        (async () => {
          let response = await getEmployees(token);
          if (response.status === 200) {
            let { message } = response.data;
            if (message.length) {
              setEmployees(message);
            }
          }
      })();
      }
    } 
  }, [employees]);

  useEffect(() => {
    console.log(oEmployee);
  }, [oEmployee]);

  const handleEdit = (id) =>{
    setEmployee(employees.find(oItem => oItem.id === id));
    setIsModalVisible(!isModalVisible);
  };

  const handleDelete = async (id) => {
    let oTemp = [ ...employees ];
    let oEmployee = employees.find(oItem => oItem.id === id);
    oTemp.splice(employees.indexOf(oEmployee), 1);
    setEmployees(oTemp);
    let oResponse = await deleteEmployee(oEmployee.id, token);
    infoDelete(oResponse, handleData);
  };

  const handleCancel = () =>  {
    setIsModalVisible(!isModalVisible);
    setEmployee(initialState);
  };

  const handleSearch = ({ valueToSearch,field }) => {
    let search = employees.find(oItem => oItem[field] === valueToSearch);
    if(search) {
      setIsNotSearching(!isNotSearching);
      setEmployees([search]);
    }
    else {
      message.info("Usuario no encontrado");
    }
  };
  
  return (
    <Layout>
      <EmployeeForm
        initialState={initialState}
        oEmployee={oEmployee}
        isNotSearching={isNotSearching}
        setIsNotSearching={setIsNotSearching}
        form={form}
        handleCancel={handleCancel}
        handleData={handleData}
        isModalVisible={isModalVisible}
        title={`${oEmployee.id ? 'Editar' : 'Agregar'} empleado`}
        token={token}
      />
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Inicio</Menu.Item>
          </Menu>
      </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Recursos Humanos</Breadcrumb.Item>
        <Breadcrumb.Item>Empleados</Breadcrumb.Item>
      </Breadcrumb>
      {/* Search */}
      <Form 
        onFinish={handleSearch}
        form={form}
      >
        <Row justify="space-between">
          <Col span={10}>
            <Form.Item name="valueToSearch">
              <Input
                type="text"
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="field">
              <Select placeholder="Campo a buscar">
                <Option value="first_name">Nombre</Option>
                <Option value="last_name">Apellido(s)</Option>
                <Option value="phone_number">Telefono</Option>
                <Option value="email">Email</Option>
                <Option value="address">Dirección</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
              >
                Buscar
              </Button>
            </Form.Item>
          </Col>
          <Col span={6}>
          <Button 
            onClick={() => {handleData();form.resetFields(); setIsNotSearching(!isNotSearching)}}
            disabled={isNotSearching}
          >
            Limpiar Filtros
          </Button>
          </Col>
        </Row>
      </Form>
      <Button type="primary" onClick={() => setIsModalVisible(!isModalVisible)}>Agregar empleado</Button>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380, margin: '16px 0' }}>
        <Table
          columns={columns(handleEdit, handleDelete)}
          dataSource={employees}
          rowKey={record => record.id}
        />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2021 Created by vJoN4</Footer>
    </Layout>
  );
}