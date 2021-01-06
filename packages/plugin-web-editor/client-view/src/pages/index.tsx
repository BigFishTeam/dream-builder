import React from 'react';
import { Layout } from 'tea-component/lib/layout';
import { Text } from 'tea-component/lib/text';
import { Card } from 'tea-component/lib/card';
import { Button } from 'tea-component/lib/button';
import { List } from 'tea-component/lib/list';
import { Icon } from 'tea-component/lib/icon';
import { ExternalLink } from 'tea-component/lib/link';
import { Row, Col } from 'tea-component/lib/grid';
import { Link } from 'react-router-dom';

import 'tea-component/lib/tea.css';

const { Content } = Layout;

function IndexPage() {
  return (
    <Content>
      <Content.Header
        showBackButton={false}
        onBackButtonClick={console.log}
        title="个人空间"
        subtitle={
          <>
            团队、应用管理 <Text theme="label">管理你的应用和团队</Text>
          </>
        }
        operation={<ExternalLink weak>帮助</ExternalLink>}
      />
      <Content.Body full>
        <Card>
          <Card.Body>
            <Row>
              <Col span={16}>
                <Card>
                  <Card.Header>
                    <h3>我的应用</h3>
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
              </Col>
              <Col span={8}>
                <Card>
                  <Card.Header>
                    <h3>我的团队</h3>
                  </Card.Header>
                  <Card.Body>
                    <List>
                      <List.Item>
                        <Card.Body
                          title="BigFish"
                          subtitle="创建时间：2020-06-01"
                          operation={
                            <Button type="link">
                              <Link to="/team">编辑</Link>
                            </Button>
                          }>
                          前端捣鼓团队
                        </Card.Body>
                      </List.Item>
                    </List>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Content.Body>
    </Content>
  );
}

export default IndexPage;
