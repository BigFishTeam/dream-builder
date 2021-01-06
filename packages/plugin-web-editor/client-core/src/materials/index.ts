import Input from './components/input';
import Row from './components/row';
import Col from './components/col';
import Switch from './components/switch';
import Table from './components/table';
import Button from './components/button';
import Card from './components/card';
import Label from './components/label';
import Menu from './components/menu';
import Calendar from './components/calendar';
import Form from './components/form';
import Chart from './components/chart';
import 'reflect-metadata';
export type MaterialInfoType = {
  name: string;
  icon: string;
  desc: string;
  isLayoutNode: boolean;
  layoutCapacity?: number;
  nodeDemandCapacity: number;
  type: string;
  iconMode?: 'src';
  config?: {
    name: string;
  }[];
};

export const getMetaInfo = (material: any) => {
  const metadata = {} as { [key: string]: any };
  const keys = Reflect.getMetadataKeys(material);
  keys.forEach(key => {
    metadata[key as string] = Reflect.getMetadata(key, material);
  });
  return metadata as MaterialInfoType;
};

export default {
  Input,
  Row,
  Col,
  Switch,
  Table,
  Button,
  Card,
  Label,
  Menu,
  Calendar,
  Form,
  Chart,
};
