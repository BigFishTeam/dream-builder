/**
 * @file routerPage.config.js
 * @date 2019-01-24 16.11.36
 */

// 引入menu配置
import menuConfig from './menu.config';
import getJsxComponent from '@/docs/utils/transfromMdx';
import 'prismjs/themes/prism-tomorrow.css';
import '@/docs/style/markdown.less';
import FeedbackDemo from '@/pages/components/feedback';
import ImgCropperDemo from '@/pages/components/imgCropper';
// import SodaButtonGroupDemo from '@/pages/components/button';

export default {
  defaultSelectedKey: menuConfig.defaultSelectedKey, // 默认选中路由
  data: [
    {
      path: '/guides',
      name: '指南',
      routes: [
        {
          path: '/guides/about',
          name: '关于SUI',
          hideTitle: true,
          component: getJsxComponent('guides/about')
        },
        {
          path: '/guides/start',
          name: '快速开始',
          hideTitle: true,
          component: getJsxComponent('guides/start'),
          onEnter: () => {
            // console.log('enter page!');
          },
          onLeave: () => {
            // console.log('leave page!');
          }
        },
        {
          path: '/guides/navIndex',
          name: '路由和菜单',
          hideTitle: true,
          component: getJsxComponent('guides/navIndex')
        },
        {
          path: '/guides/suggest/message',
          name: '信息架构',
          hideTitle: true,
          component: getJsxComponent('guides/message')
        },
        {
          path: '/guides/suggest/interactive',
          name: '交互设计',
          hideTitle: true,
          component: getJsxComponent('guides/interactive')
        },
        {
          path: '/guides/suggest/ui',
          name: 'UI设计',
          hideTitle: true,
          component: getJsxComponent('guides/ui')
        }
      ]
    },
    {
      path: '/icons',
      name: 'sui-icons',
      routes: [
        {
          path: '/icons/list',
          name: 'icons',
          component: getJsxComponent('icons/list')
          // pageWrapper: 'Content'
        },
        {
          path: '/icons/new',
          name: '制作新icon',
          component: getJsxComponent('icons/new')
          // pageWrapper: 'Content'
        }
      ]
    },
    {
      path: '/components',
      name: '组件',
      routes: [
        {
          path: '/components/browserUpdate',
          name: '浏览器检测',
          hideTitle: true,
          component: getJsxComponent('components/browserUpdate')
        },
        {
          path: '/components/collapsedTrigger',
          name: '折叠',
          hideTitle: true,
          component: getJsxComponent('components/collapsedTrigger')
        },
        {
          path: '/components/httpError',
          name: 'http错误',
          hideTitle: true,
          component: getJsxComponent('components/httpError')
        },
        {
          path: '/components/wrapper',
          name: '布局容器',
          hideTitle: true,
          component: getJsxComponent('components/wrapper')
        },
        {
          path: '/components/menu',
          name: '菜单(hash)',
          hideTitle: true,
          component: getJsxComponent('components/menu')
        },
        {
          path: '/components/browserHistoryMenu',
          name: '菜单(browser)',
          hideTitle: true,
          component: getJsxComponent('components/browserHistoryMenu')
        },
        {
          path: '/components/routerPage',
          name: '路由页面(hash)',
          hideTitle: true,
          component: getJsxComponent('components/routerPage')
        },
        {
          path: '/components/browserRouterPage',
          name: '路由页面(hash)',
          hideTitle: true,
          component: getJsxComponent('components/browserRouterPage')
        },
        {
          path: '/components/sodaBreadcrumb',
          name: '面包屑',
          hideTitle: true,
          component: getJsxComponent('components/sodaBreadcrumb')
        },
        {
          path: '/components/sodaForm',
          name: '表单',
          hideTitle: true,
          component: getJsxComponent('components/sodaForm')
        },
        {
          path: '/components/feedback',
          name: '反馈',
          hideTitle: true,
          component: FeedbackDemo
        },
        {
          path: '/components/searchRTX',
          name: '搜索RTX',
          hideTitle: true,
          component: getJsxComponent('components/searchRtx')
        },
        {
          path: '/components/button',
          name: '按钮',
          hideTitle: true,
          component: getJsxComponent('components/button')
        },
        {
          path: '/components/navigationPrompt',
          name: '页面跳转提示',
          hideTitle: true,
          component: getJsxComponent('components/navigationPrompt')
        },
        {
          path: '/components/avatar',
          name: '头像',
          hideTitle: true,
          component: getJsxComponent('components/avatar')
        },
        {
          path: '/components/caption',
          name: '标题',
          hideTitle: true,
          component: getJsxComponent('components/caption')
        },
        {
          path: '/components/logo',
          name: '网站logo',
          hideTitle: true,
          component: getJsxComponent('components/logo')
        },
        {
          path: '/components/sodaPopover',
          name: '气泡卡片',
          hideTitle: true,
          component: getJsxComponent('components/sodaPopover')
        },
        {
          path: '/components/sodaTable',
          name: '表格',
          hideTitle: true,
          component: getJsxComponent('components/sodaTable')
        },
        {
          path: '/components/echarts',
          name: '图表-echarts',
          hideTitle: true,
          component: getJsxComponent('components/echarts')
        },
        {
          path: '/components/videoPlayer',
          name: '播放器',
          hideTitle: true,
          component: getJsxComponent('components/videoPlayer')
        },
        {
          path: '/components/waitCheck',
          name: '待审',
          hideTitle: true,
          component: getJsxComponent('components/waitCheck')
        },
        {
          path: '/components/watermark',
          name: '水印',
          hideTitle: true,
          component: getJsxComponent('components/watermark')
        },
        {
          path: '/components/timeout',
          name: '超时提示',
          hideTitle: true,
          component: getJsxComponent('components/timeOut')
        },
        {
          path: '/components/style',
          name: '样式&样式组件',
          hideTitle: true,
          component: getJsxComponent('components/style')
        },
        {
          path: '/components/reviewImgGroup',
          name: '图片组',
          hideTitle: true,
          component: getJsxComponent('components/reviewImgGroup')
        },
        {
          path: '/components/reviewInfoTab',
          name: '审核信息展示',
          hideTitle: true,
          component: getJsxComponent('components/reviewInfoTab')
        },
        {
          path: '/components/reviewClassificationButtonGroup',
          name: '审核分类按钮组',
          hideTitle: true,
          component: getJsxComponent(
            'components/reviewClassificationButtonGroup'
          )
        },
        {
          path: '/components/imgCropper',
          name: '图片标注',
          hideTitle: true,
          component: ImgCropperDemo
        }
      ]
    },
    {
      path: '/guides',
      name: '指南',
      routes: [
        {
          path: '/guides/about',
          name: '关于SUI',
          hideTitle: true,
          component: getJsxComponent('guides/about')
        },
        {
          path: '/guides/start',
          name: '快速开始',
          hideTitle: true,
          component: getJsxComponent('guides/start')
        },
        {
          path: '/guides/about',
          name: '信息架构',
          hideTitle: true,
          component: getJsxComponent('guides/message')
        },
        {
          path: '/guides/about',
          name: '交互设计',
          hideTitle: true,
          component: getJsxComponent('guides/interactive')
        },
        {
          path: '/guides/about',
          name: 'UI设计',
          hideTitle: true,
          component: getJsxComponent('guides/ui')
        }
      ]
    },
    {
      path: '/cooperation',
      name: '协作开发',
      routes: [
        {
          path: '/cooperation/standard',
          name: '规范',
          hideTitle: true,
          component: getJsxComponent('cooperation/standard')
        },
        {
          path: '/cooperation/new',
          name: '制作新组件',
          hideTitle: true,
          component: getJsxComponent('cooperation/new')
        }
      ]
    }
  ]
};
