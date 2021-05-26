import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { info } from '../../utils/functions'
import { saveUser } from '../../service/api';

export const RegisterScreen = () => {

  const handleRegister = async (data) => {
    let oResponse = await saveUser(data);
    info(oResponse);
    window.location.replace(window.location.href.replace("/register", "/"));
  };

  return(
    <>
      <Row className="login-main">
        <Col span={10}>
          <div className="login-container">
            <h2>Crear cuenta</h2>
            <Form onFinish={handleRegister}>
              <Form.Item name="username" >
                <Input
                  type="text"
                  prefix={<UserOutlined />}
                  placeholder="Nombre de usuario
                  "
                  size="large"
                />
              </Form.Item>
              <Form.Item name="email" >
                <Input
                  type="text"
                  prefix={<MailOutlined />}
                  placeholder="Correo
                  "
                  size="large"
                />
              </Form.Item>
              <Form.Item name="user_password">
                <Input
                  type="password"
                  prefix={<LockOutlined />}
                  placeholder="Contraseña"
                  size="large"
                />
              </Form.Item>
              <Row style={{ marginBottom: "1em" }}>
                <a href="/#"><Link to="/">Ya tienes una cuenta, inicia sesión aqui</Link></a>
              </Row>
              <Button
                htmlType="submit"
                type="primary"
              >
                Register
              </Button>
            </Form>
          </div>
        </Col>
        <Col span={14}>
          <div className="logo">
          </div>
        </Col>
      </Row>
    </>
  );
};
