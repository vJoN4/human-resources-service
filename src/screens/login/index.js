import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { info } from '../../utils/functions'
import { login } from '../../service/api';

export const LoginScreen = () => {

  const handleLogin = async (data) => {
    let oResponse = await login(data);
    let token = info(oResponse);
    if(token){
      window.location.replace(window.location.href + "home");
      window.localStorage.setItem("token", token);
    }
  };

  return(
    <>
      <Row className="login-main">
        <Col span={10}>
          <div className="login-container">
            <h1>Bienvenido</h1>
            <Form onFinish={handleLogin}>
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
                <a href="/#"><Link to="/register">No tienes una cuenta, crea una aqui</Link></a>
              </Row>
              <Button
                htmlType="submit"
                type="primary"
              >
                Login
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
}