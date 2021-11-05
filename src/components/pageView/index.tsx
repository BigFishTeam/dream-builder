import React, { useCallback, useEffect, useState } from 'react';
import { BEM } from '../../common/utils/bem';
import './index.scss';
import { Popover, Button, Modal, Input, Row, Switch } from 'antd';
import { useGlobalContext } from '../../context/global';

const PageConfigModal: React.FC<{
  visible: boolean;
  onCancel: any;
  config?: {
    name: string;
    isIndex: boolean;
    path: string;
  };
  onSave: any;
}> = ({ visible, onCancel, onSave, config }) => {
  const [pageName, setPageName] = useState<string>('');
  const [pagePath, setPagePath] = useState<string>('');
  const [isIndex, setIsIndex] = useState<boolean>(false);

  const clear = () => {
    setPageName('');
    setPagePath('');
    setIsIndex(false);
  };

  const onSaveInner = useCallback(() => {
    onSave({
      name: pageName,
      isIndex,
      path: pagePath,
    });
    clear();
  }, [pageName, pagePath, isIndex]);

  return (
    <Modal visible={visible} onCancel={onCancel} title={config ? '页面配置' : '新增页面'} onOk={onSaveInner}>
      <Row style={{ minHeight: 60 }}>
        <span>页面名称</span>
        <Input
          value={pageName}
          onChange={e => {
            setPageName(e.target.value);
          }}
        />
      </Row>
      <Row style={{ minHeight: 60, marginTop: '10px' }}>
        <span>页面路径</span>
        <Input
          value={pagePath}
          onChange={e => {
            setPagePath(e.target.value);
          }}
        />
      </Row>
      <Row style={{ minHeight: 40, marginTop: '18px' }}>
        <span style={{ paddingRight: 10 }}>是否为首页</span>
        <Switch
          checked={isIndex}
          onChange={ckd => {
            setIsIndex(ckd);
          }}
        />
      </Row>
    </Modal>
  );
};

const PageView: React.FC = () => {
  const { ast, astTool, eBus } = useGlobalContext();
  const [pageList, setPageList] = useState<ReturnType<typeof astTool.getPageList>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<string>(astTool.getSelectPage() || '');

  const addPage = useCallback(() => {
    setModalVisible(true);
  }, []);

  const onCancel = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onSave = useCallback(config => {
    const page = astTool.createNewPage(config);
    setModalVisible(false);
    selectPageFromPageView(page.id);
  }, []);

  const selectPageFromPageView = useCallback((id: string) => {
    astTool.changePage(id);
    setSelectedPage(id);
    eBus.emit('pageChange', id);
  }, []);

  useEffect(() => {
    setPageList(astTool.getPageList());
  }, [astTool, ast]);

  return (
    <div className={BEM('content', 'pageView')}>
      <div className={BEM('content', 'pageView-title')}>页面编辑</div>
      <div className={BEM('content', 'pageView-pageItemWrapper')}>
        {pageList?.map(page => {
          return (
            <Popover
              content={
                <div>
                  <div>页面名:{page.name}</div>
                  <div>是否首页:{page.isIndex ? '是' : '否'}</div>
                  <div>路径:{page.path}</div>
                  <div>
                    <Button>修改页面</Button>
                    <Button>删除页面</Button>
                  </div>
                </div>
              }>
              <div
                onClick={() => {
                  selectPageFromPageView(page.id);
                }}
                className={`
                  ${BEM('content', 'pageView-pageItem')} ${page.id === selectedPage &&
                  BEM('content', 'pageView-pageItem', 'active')}
                `}>
                {page.name}
              </div>
            </Popover>
          );
        })}
      </div>
      <Popover content={'新增一个页面'}>
        <div className={BEM('content', 'pageView-addPage')} onClick={addPage}>
          +
        </div>
      </Popover>
      <PageConfigModal visible={modalVisible} onCancel={onCancel} onSave={onSave} />
    </div>
  );
};

export default PageView;
