/**
 * @file menu.config.js
 * @date 2019-01-25 16.13.00
 */

// 引入antd Icon组件
import React from 'react';
import { Icon } from 'antd';

// 路由配置
export default {
  defaultSelectedKey: '/guides/about', // 默认选中路由
  data: [
    {
      path: '/guides',
      name: '指南',
      icon: <Icon type="home" theme="filled" />,
      routes: [
        {
          path: '/guides/about',
          name: '关于SUI',
          routes: [
            {
              path: '/guides/about/part1',
              name: '第一节'
            }
          ]
        },
        {
          path: '/guides/start',
          name: '快速开始'
        },
        {
          path: '/guides/navIndex',
          name: '路由和菜单'
        },
        {
          path: '/guides/suggest',
          tagname: '实践建议',
          routes: [
            {
              path: '/guides/suggest/message',
              name: '信息架构'
            },
            {
              path: '/guides/suggest/interactive',
              name: '交互设计'
            },
            {
              path: '/guides/suggest/ui',
              name: 'UI设计'
            }
          ]
        }
      ]
    },
    {
      path: '/icons',
      name: '图标',
      icon: <Icon type="star" theme="filled" />,
      routes: [
        {
          path: '/icons/list',
          name: '列表'
        },
        {
          path: '/icons/new',
          name: '制作新图标'
        }
      ]
    },
    {
      path: '/components',
      icon: <Icon type="appstore" theme="filled" />, // 传入antd Icon组件
      name: '组件',
      routes: [
        {
          tagname: '布局',
          routes: [
            {
              path: '/components/wrapper',
              name: '布局容器'
            }
          ]
        },
        {
          tagname: '导航',
          routes: [
            {
              path: '/components/menu',
              name: '菜单(hash)'
            },
            {
              path: '/components/browserHistoryMenu',
              name: '菜单(browser)'
            },
            {
              path: '/components/routerPage',
              name: '路由页面(hash)'
            },
            {
              path: '/components/browserRouterPage',
              name: '路由页面(browser)'
            },
            {
              path: '/components/sodaBreadcrumb',
              name: '面包屑'
            },
            {
              path: '/components/navigationPrompt',
              name: '页面跳转提示'
            }
          ]
        },
        {
          tagname: '通用',
          routes: [
            {
              path: '/components/browserUpdate',
              name: '浏览器检测'
            },
            {
              path: '/components/collapsedTrigger',
              name: '折叠'
            },
            {
              path: '/components/httpError',
              name: 'http错误'
            },
            {
              path: '/components/style',
              name: '样式&样式组件'
            },
            {
              path: '/components/button',
              name: '按钮'
            }
          ]
        },

        {
          tagname: '数据录入',
          routes: [
            {
              path: '/components/sodaForm',
              name: '表单'
            },
            {
              path: '/components/feedback',
              name: '反馈'
            },
            {
              path: '/components/searchRTX',
              name: '搜索RTX'
            }
          ]
        },
        {
          tagname: '数据展示',
          routes: [
            {
              path: '/components/avatar',
              name: '头像'
            },
            {
              path: '/components/caption',
              name: '标题'
            },
            {
              path: '/components/logo',
              name: '网站logo'
            },
            {
              path: '/components/sodaPopover',
              name: '气泡卡片'
            },
            {
              path: '/components/sodaTable',
              name: '表格'
            },
            {
              path: '/components/echarts',
              name: '图表-echarts'
            },
            {
              path: '/components/videoPlayer',
              name: '播放器'
            },
            {
              path: '/components/waitCheck',
              name: '待审'
            },
            {
              path: '/components/watermark',
              name: '水印'
            },
            {
              path: '/components/timeout',
              name: '超时提示'
            }
          ]
        },
        {
          tagname: '视频审核组件',
          routes: [
            {
              path: '/components/reviewImgGroup',
              name: '图片组'
            },
            {
              path: '/components/reviewInfoTab',
              name: '审核信息展示'
            },
            {
              path: '/components/reviewClassificationButtonGroup',
              name: '审核分类按钮组'
            }
          ]
        },
        {
          tagname: '图片处理组件',
          routes: [
            {
              path: '/components/imgCropper',
              name: '图片标注'
            }
          ]
        }
      ]
    },
    {
      path: '/cooperation',
      name: '协作开发',
      icon: <Icon type="heart" theme="filled" />,
      routes: [
        {
          path: '/cooperation/standard',
          name: '规范'
        },
        {
          path: '/cooperation/new',
          name: '制作新组件'
        }
      ]
    }
  ]
};
