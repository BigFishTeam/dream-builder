import React from "react";
import { Layout } from "tea-component/lib/layout";
import { Card } from "tea-component/lib/card";
import { Breadcrumb } from "tea-component/lib/breadcrumb";
import { ExternalLink } from "tea-component/lib/link";
import { Tabs, TabPanel } from "tea-component/lib/tabs";
import { withRouter } from 'react-router-dom';

const { Body, Content } = Layout;

function LayoutContentWithTabsExample() {
  const tabs = [
    { id: "basic", label: "应用概览" },
    { id: "analyse", label: "数据分析" },
    { id: "setting", label: "设置" }
  ];

  return (
    <Layout>
      <Body>
        <Content>
          <Content.Header
            showBackButton
            onBackButtonClick={console.log}
            title={<Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>我的应用</Breadcrumb.Item>
            </Breadcrumb>}
            subtitle={
              <>
                test
              </>
            }
            operation={<ExternalLink>编辑</ExternalLink>}
          />
          <Content.Body>
            <Tabs ceiling animated={false} tabs={tabs}>
              <TabPanel id="basic">
                <Card>
                  <Card.Body>应用概览</Card.Body>
                </Card>
              </TabPanel>
              <TabPanel id="analyse">
                <Card>
                  <Card.Body>数据分析</Card.Body>
                </Card>
              </TabPanel>
              <TabPanel id="setting">
                <Card>
                  <Card.Body>设置</Card.Body>
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
        border: "1px solid #ddd",
      }}
    >
      <LayoutContentWithTabsExample />
    </section>
  );
}

export default withRouter(demo);
