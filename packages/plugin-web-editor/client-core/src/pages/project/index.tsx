import React from 'react';
import { Layout, Menu, Breadcrumb, Table, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const ProjectPage: React.FC = () => {
  const history = useHistory();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">项目列表</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: '600px' }}>
        <div className="site-layout-content">
          <Table
            dataSource={[
              {
                name: '测试项目',
                id: '123',
              },
            ]}
            columns={[
              {
                title: '项目ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: '项目名',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '操作',
                render: row => {
                  return (
                    <div>
                      <Button
                        onClick={() => {
                          history.push('/layout');
                        }}>
                        进入项目
                      </Button>
                      <Button>删除项目</Button>
                    </div>
                  );
                },
              },
            ]}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Fishcui @2020 Gonggong</Footer>
    </Layout>
  );
};

export default ProjectPage;
