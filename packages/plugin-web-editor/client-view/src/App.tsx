import React from 'react';
import { Layout } from 'tea-component/lib/layout';
import { List } from 'tea-component/lib/list';
import { Icon } from 'tea-component/lib/icon';
import { Badge } from 'tea-component/lib/badge';
import { NavMenu } from 'tea-component/lib/navmenu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IndexPage from './pages/index';
import Project from './pages/projectManage/index';
import Team from './pages/teamManage/index';

import 'tea-component/lib/tea.css';

const { Header, Body } = Layout;

function App() {
  return (
    <div>
      <section
        style={{
          height: 600,
          border: '1px solid #ddd',
        }}>
        <Layout>
          <Header>
            <NavMenu
              left={
                <>
                  <NavMenu.Item type="logo">
                    <img src="https://via.placeholder.com/32.png?text=LOGO" alt="logo" />
                  </NavMenu.Item>
                  <NavMenu.Item>Dream Builder</NavMenu.Item>
                </>
              }
              right={
                <>
                  <NavMenu.Item
                    type="dropdown"
                    overlay={close => (
                      <List type="option">
                        <List.Item onClick={close}>创建应用</List.Item>
                        <List.Item className="tea-nav__list-line" onClick={close}>
                          创建团队
                        </List.Item>
                      </List>
                    )}>
                    开始创建
                  </NavMenu.Item>
                  <NavMenu.Item type="icon" selected>
                    <Icon type="news" />
                    <Badge dark theme="danger">
                      7
                    </Badge>
                  </NavMenu.Item>
                  <NavMenu.Item type="icon">
                    <Icon type="help" />
                  </NavMenu.Item>
                  <NavMenu.Item
                    type="dropdown"
                    overlay={close => (
                      <List type="option">
                        <List.Item onClick={close}>账号信息</List.Item>
                        <List.Item className="tea-nav__list-line" onClick={close}>
                          个人设置
                        </List.Item>
                        <List.Item onClick={close}>退出</List.Item>
                      </List>
                    )}>
                    zhirongtang
                  </NavMenu.Item>
                </>
              }
            />
          </Header>
          <Body>
            <Router>
              <Switch>
                <Route exact path="/">
                  <IndexPage />
                </Route>
                <Route path="/project">
                  <Project />
                </Route>
                <Route path="/team">
                  <Team></Team>
                </Route>
              </Switch>
            </Router>
          </Body>
        </Layout>
      </section>
    </div>
  );
}

export default App;
