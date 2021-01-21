/**
 * @file Menu.js
 * @date 2018-11-05 20.59.20
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, HashRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
import InterationContext from '../wrapper/context/interaction.context';
import './style/index.less';

const history = createHashHistory();
const { ScrollContext } = InterationContext;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: this.getCurrentPath() // 当前路由url
    };
  }

  // 监听路由变化，更新当前路由
  // eslint-disable-next-line
  UNSAFE_componentWillMount() {
    history.listen(() => {
      this.setState({
        currentPath: this.getCurrentPath()
      });
    });
  }

  // 接收到新属性时，更新组件状态
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    // 更新currentPath
    this.setState({
      currentPath: this.getCurrentPath()
    });
    // 折叠情况下menu样式更新
    if (nextProps.collapsed) {
      // menu滚动条复原
      this.menu.scrollTop = 0;
      // 更新submenu样式
      this.updateCollapsedStyle();
    } else {
      // 展开菜单时，清空折叠样式
      this.clearCollapsedStyle();
    }
  }

  componentDidMount() {
    if (this.props.collapsed) {
      this.updateCollapsedStyle();
    }
  }

  // 折叠样式更新
  updateCollapsedStyle = () => {
    this.props.menuData.forEach((item, index) => {
      const { name } = item;
      const firstMenu = this[`menu-${this.props.menuData[0].name}`];
      const currentSubMenu = this[`submenu-${name}`];
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      if (firstMenu && currentSubMenu) {
        const menuBottomHeight =
          windowHeight - firstMenu.getBoundingClientRect().top - index * 56;
        const submenuHeight = currentSubMenu.getBoundingClientRect().height;

        // subMenu在当前视图区能放下
        if (menuBottomHeight - 43 >= submenuHeight) {
          currentSubMenu.style.top = 0;
        } else {
          // menu高度
          const menuHeight = windowHeight - 82;
          // menu高度能放下submenu，submenu往上移动一段距离
          if (menuHeight > submenuHeight) {
            currentSubMenu.style.top = `${menuBottomHeight -
              submenuHeight -
              43}px`;
          } else {
            // 否则出现滚动条
            currentSubMenu.style.maxHeight = `${menuHeight - 21}px`;
            currentSubMenu.style.top = `${-(index * 56 + 20)}px`;
          }
        }
      }
    });
  };

  // 清除折叠样式
  clearCollapsedStyle = () => {
    this.props.menuData.forEach(item => {
      const { name } = item;
      const currentSubMenu = this[`submenu-${name}`];
      if (currentSubMenu) {
        currentSubMenu.style = '';
      }
    });
  };

  // 计算当前路由currentPath
  getCurrentPath = () => {
    // 当前路由currentPath
    const pathname = history.location.pathname.split('/');
    pathname.shift();
    const currentPath = `/${pathname.join('/')}`;
    return currentPath;
  };

  // 展开或关闭subMenu
  toggleSubMenu = name => {
    const { menuData } = this.props;
    // 打开某个subMenu，须隐藏其他打开的subMenu
    const currentE = this[`submenu-${name}`];
    if (currentE.classList.contains('none')) {
      this.getBrotherSubMenus(menuData, name).forEach(menuName => {
        const otherE = this[`submenu-${menuName}`];
        if (otherE && !otherE.classList.contains('none')) {
          // 收起
          this.toggleAnimation('hide', otherE);
        }
      });
      // 展开
      this.toggleAnimation('show', currentE);
    } else {
      // 收起
      this.toggleAnimation('hide', currentE);
    }
  };

  // 导航收起、展开、清除动画
  toggleAnimation = (flag, currentE) => {
    if (flag === 'show') {
      // 展开
      currentE.style.height = '0px';
      currentE.style.display = 'block';
      currentE.classList.add('submenu-list-activating');
      currentE.style.height = `${currentE.scrollHeight}px`;
    } else if (flag === 'hide') {
      // 收起
      currentE.style.height = `${currentE.scrollHeight}px`;
      currentE.classList.add('submenu-list-activating');
      setTimeout(() => {
        currentE.style.height = '0px';
      }, 0);
    }
    // 清除
    setTimeout(() => {
      currentE.classList.remove('submenu-list-activating');
      currentE.classList.toggle('none');
      currentE.style.height = '';
      currentE.style.display = '';
    }, 150);
  };

  // 获取subMenu列表
  getSubMenuList = (menuData, subMenuList) => {
    subMenuList.push(menuData.map(item => item.tagname || item.name));
    menuData.forEach(submenu => {
      if (submenu.routes) {
        this.getSubMenuList(submenu.routes, subMenuList);
      }
    });
  };

  // 获取subMenu同级兄弟目录名
  getBrotherSubMenus = (menuData, name) => {
    const subMenuList = [];
    this.getSubMenuList(menuData, subMenuList);
    return subMenuList.find(item => item.includes(name));
  };

  // 获取具有权限的路由
  getMenuItemPaths = (menuData, pathList) => {
    menuData.forEach(menu => {
      const { path, routes } = menu;
      if (!routes) {
        pathList.push(path);
      } else {
        this.getMenuItemPaths(routes, pathList);
      }
    });
  };

  // 判断当前菜单是否展开
  getSubMenuCollapsed = (item, currentPath) => {
    let flag = false;
    if (
      currentPath.includes(`${item.path}/`) &&
      currentPath.startsWith(`${item.path}/`) &&
      currentPath.split('/').length !== item.path.split('/').length
    ) {
      flag = true;
    } else {
      item.routes.forEach(ele => {
        if (ele.routes) {
          return this.getSubMenuCollapsed(ele, currentPath);
        }
        if (
          currentPath.includes(ele.path) &&
          currentPath.startsWith(ele.path)
        ) {
          console.log('包含：', item.path, ele.path);
          flag = true;
        }
      });
    }
    return flag;
  };

  // 判断当前菜单是否高亮
  getMenuItemSelected = (item, currentPath) => {
    const path = item.path.split('?')[0];
    // 相同路径高亮
    if (currentPath === path) {
      return true;
    }
    if (
      // 子路径高亮
      currentPath.includes(`${path}/`) &&
      currentPath.startsWith(`${path}/`) &&
      currentPath.split('/').length !== path.split('/').length
    ) {
      return true;
    }
    return false;
  };

  // 递归获取tagname、subMenu或menuItem
  getSubMenuOrItem = item => {
    const { collapsed, menuData, MenuItemSlot } = this.props;
    const { name, tagname, routes, icon, path } = item;
    // console.log('path:', path);
    // 是否为根节点
    const isRootPath = (path && path.split('/').length === 2) || path === '0';

    // 如果包含routes，渲染成submenu或tagname两种类型
    if (routes) {
      // tagname类型
      if (tagname) {
        return (
          <div className="submenu-item" key={`tag_${tagname}`}>
            <span>{tagname}</span>
            {this.getNavMenuItems(item.routes)}
          </div>
        );
      }
      // subMenu类型
      const menuItemPathList = [];
      this.getMenuItemPaths(menuData, menuItemPathList);
      return (
        <div
          ref={ref => (this[`menu-${name}`] = ref)}
          className={`sui-menu-submenu ${
            isRootPath ? 'sui-menu-rootmenu' : ''
          }`}
          key={`menu_${name || tagname}`}
        >
          <div
            className="submenu-name"
            aria-hidden="true"
            onClick={() => {
              if (!collapsed) {
                this.toggleSubMenu(name);
              }
            }}
          >
            <span className="sui-menu-icon">{icon}</span>
            <div>
              <span
                className={`submenu-name-active ${
                  collapsed && isRootPath ? 'submenu-name-active-collapsed' : ''
                } ${isRootPath ? 'rootmenu-name' : ''}`}
              >
                {name}
              </span>
            </div>
          </div>
          <div
            ref={ref => (this[`submenu-${name}`] = ref)}
            className={
              !isRootPath
                ? ''
                : `submenu-list
               ${
                 this.getSubMenuCollapsed(item, this.state.currentPath) &&
                 !collapsed
                   ? ''
                   : 'none'
               }
               ${collapsed ? 'submenu-list-collapsed' : ''}`
            }
          >
            {this.getNavMenuItems(routes)}
          </div>
        </div>
      );
    }
    // 如果不含routes，渲染为menuItem类型
    return (
      <Link
        to={path}
        className={`submenu-item-node ${
          this.getMenuItemSelected(item, this.state.currentPath)
            ? 'submenu-item-node-selected'
            : ''
        }`}
        key={path}
        onClick={() => this.changeCurrentPath(path)}
      >
        {icon && (
          <span
            className={`sui-menu-icon ${
              this.state.currentPath.includes(path) &&
              this.state.currentPath.startsWith(path)
                ? 'sui-menu-icon-selected'
                : ''
            }`}
          >
            {icon}
          </span>
        )}
        <span
          className={`${collapsed ? 'submenu-item-node-collapsed' : ''} ${
            isRootPath ? 'rootmenu-name' : ''
          }`}
        >
          {name}
        </span>
        {MenuItemSlot ? <MenuItemSlot path={path} /> : null}
      </Link>
    );
  };

  // 根据路menuData渲染menuItems
  getNavMenuItems = menuData => {
    if (!menuData) {
      return [];
    }
    return menuData
      .map((item, index) => this.getSubMenuOrItem(item, index))
      .filter(item => item);
  };

  // 更新当前路由,打开当前路由所在子目录
  changeCurrentPath = path => {
    this.setState({
      currentPath: path
    });
  };

  render() {
    const { menuData, collapsed } = this.props;
    // 头部logo高度 72px + 底部padding 10px = 82px
    return (
      <ScrollContext.Consumer>
        {({ allowScroll = true }) => (
          <HashRouter>
            <div
              ref={ref => (this.menu = ref)}
              className={`sui-menu ${collapsed ? 'sui-menu-collapsed' : ''} ${
                allowScroll && !collapsed ? 'sui-menu-allowScroll' : ''
              }`}
              style={{ height: 'calc(100% - 72px)' }}
            >
              <div
                className={`sui-menu-list ${
                  collapsed ? 'sui-menu-list-collapsed' : ''
                }`}
              >
                {this.getNavMenuItems(menuData)}
              </div>
            </div>
          </HashRouter>
        )}
      </ScrollContext.Consumer>
    );
  }
}

Menu.propTypes = {
  /** menu配置数据
   * 参考/src/menu.config.js中的data字段
   * */
  menuData: PropTypes.array.isRequired,
  /** 默认选中路由
   * 参考/src/menu.config.js中的defaultSelectedKey字段
   * */
  defaultSelectedKey: PropTypes.string,
  /** menu是否折叠
   * */
  collapsed: PropTypes.bool,
  /** menuItem组件插槽，通常用来显示菜单附属信息
   * */
  MenuItemSlot: PropTypes.element
};

Menu.defaultProps = {
  menuData: [],
  defaultSelectedKey: '',
  collapsed: false,
  MenuItemSlot: null
};

export default Menu;
