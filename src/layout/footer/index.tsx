import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import './index.scss';
import { BEM } from '../../common/utils/bem';
import { AstNodeType } from '../../core/ast';
import eventManager from '../../eventManager';
import { useGlobalContext } from '../../context/global';

const Footer: React.FC<{}> = function() {
  const [pathStack, setPathStack] = useState<string[]>(['Default']);
  const { astTool } = useGlobalContext();

  const pathStackRef = useRef<string[]>(pathStack);

  useEffect(() => {
    eventManager.listen('elementSelect', ({ component }: { component: AstNodeType }) => {
      const walk = (cmp: AstNodeType) => {
        const parentPage = astTool.getParentPage(cmp);
        const parentNode = astTool.getParent(cmp);
        if (parentPage) {
          const tempPathStack = _.cloneDeep(pathStackRef.current);
          tempPathStack.unshift(parentPage.name);
          setPathStack(tempPathStack);
          pathStackRef.current = tempPathStack;
          return;
        }
        if (parentNode) {
          const tempPathStack = _.cloneDeep(pathStackRef.current);
          tempPathStack.unshift(parentNode.type);
          setPathStack(tempPathStack);
          pathStackRef.current = tempPathStack;
          walk(parentNode);
        }
      };
      setPathStack([component.type]);
      pathStackRef.current = [component.type];
      walk(component);
    });
    eventManager.listen('selectNone', () => {
      setPathStack(['Default']);
    });
  }, []);

  return (
    <div className={BEM('footer', 'wrapper')}>
      {pathStack.map((path, idx) => {
        return (
          <span>
            {path}
            <span style={{ marginLeft: 5, marginRight: 5 }}>{idx < pathStack.length - 1 ? '>' : ''}</span>
          </span>
        );
      })}
    </div>
  );
};

export default Footer;
