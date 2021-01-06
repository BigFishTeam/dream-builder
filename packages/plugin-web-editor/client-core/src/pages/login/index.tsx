import React, { FC } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { login } from '../../service';

const Login: FC = () => {
  const history = useHistory();
  const onFinish = (values: any) => {
    history.push('/project');
    // login({
    //   name: values.username,
    //   password: values.password,
    // })
    //   .then(res => {
    //     if (res.data.success === true) {
    //       alert('登录成功');
    //       history.push('/project');
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  };

  return (
    <div>
      <Card>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <a
              className="login-form-forgot"
              onClick={() => {
                history.push('/register');
              }}>
              现在注册
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
