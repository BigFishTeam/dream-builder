import React from 'react';
import { Layout } from 'tea-component/lib/layout';
import { Card } from 'tea-component/lib/card';
import { Justify } from 'tea-component/lib/justify';
import { Breadcrumb } from 'tea-component/lib/breadcrumb';
import { List } from 'tea-component/lib/list';
import { Button } from 'tea-component/lib/button';
import { Icon } from 'tea-component/lib/icon';
import { Tabs, TabPanel } from 'tea-component/lib/tabs';
import { H3 } from 'tea-component/lib/heading';
import { withRouter, Link } from 'react-router-dom';
import SettingForm from './setting';

const { Body, Content } = Layout;

function LayoutContentWithTabsExample() {
  const tabs = [
    { id: 'basic', label: '团队概览' },
    { id: 'persons', label: '成员' },
    { id: 'setting', label: '设置' },
  ];

  return (
    <Layout>
      <Body>
        <Content>
          <Content.Header
            showBackButton
            onBackButtonClick={console.log}
            title={
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>我的团队</Breadcrumb.Item>
              </Breadcrumb>
            }
            subtitle={<>BigFish</>}
            operation={null}
          />
          <Content.Body>
            <Tabs ceiling animated={false} tabs={tabs}>
              <TabPanel id="basic">
                <Card>
                  <Card.Header>
                    <Justify
                      left={<H3>我的应用</H3>}
                      right={
                        <>
                          <Button type="primary" style={{ marginRight: 20 }}>
                            创建应用
                          </Button>
                        </>
                      }
                    />
                  </Card.Header>
                  <Card.Body>
                    <List>
                      <List.Item>
                        <Card.Body
                          title="test"
                          subtitle="创建时间：2020-06-01"
                          operation={
                            <Button type="link">
                              <Link to="/project">编辑</Link>
                            </Button>
                          }>
                          <Icon type="relationship" /> BigFish
                        </Card.Body>
                      </List.Item>
                    </List>
                  </Card.Body>
                </Card>
              </TabPanel>
              <TabPanel id="persons">
                <Card>
                  <Card.Header>
                    <Justify
                      left={<H3>成员</H3>}
                      right={
                        <>
                          <Button type="primary" style={{ marginRight: 20 }}>
                            添加成员
                          </Button>
                        </>
                      }
                    />
                  </Card.Header>
                  <Card.Body>
                    <List>
                      <List.Item>
                        <Card.Body
                          title="zhirongtang"
                          subtitle="管理员"
                          operation={
                            <Button type="link">
                              <Link to="/">编辑</Link>
                            </Button>
                          }>
                          <Icon type="relationship" /> BigFish
                        </Card.Body>
                      </List.Item>
                      <List.Item>
                        <Card.Body
                          title="fishcui"
                          subtitle="管理员"
                          operation={
                            <Button type="link">
                              <Link to="/">编辑</Link>
                            </Button>
                          }>
                          <Icon type="relationship" /> BigFish
                        </Card.Body>
                      </List.Item>
                    </List>
                  </Card.Body>
                </Card>
              </TabPanel>
              <TabPanel id="setting">
                <Card>
                  <Card.Header>
                    <H3>设置</H3>
                  </Card.Header>
                  <Card.Body>
                    <SettingForm></SettingForm>
                  </Card.Body>
                </Card>
              </TabPanel>
            </Tabs>
          </Content.Body>
        </Content>
      </Body>
    </Layout>
  );
}

const demo = function Demo() {
  return (
    <section
      style={{
        // height: 360,
        border: '1px solid #ddd',
      }}>
      <LayoutContentWithTabsExample />
    </section>
  );
};

export default withRouter(demo);
