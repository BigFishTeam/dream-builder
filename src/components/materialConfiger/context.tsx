import React, { useContext } from 'react';

export interface SelectPropertyConfigName {
  type: 'static' | 'state' | 'method';
  value: string;
}

interface ElementConfigerContextType {
  selectElementId?: string;
  selectPropertyName?: string;
  selectPropertyConfig?: SelectPropertyConfigName;
  setSelectElementId?: any;
  setSelectPropertyName?: any;
  setSelectPropertyConfig?: any;
}

const ConfigerContext = React.createContext<ElementConfigerContextType>({});
export const useConfigerContext = function() {
  return useContext(ConfigerContext);
};

export default ConfigerContext;
