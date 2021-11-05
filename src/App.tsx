import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './layout/index';
import Home from './pages/home/index';
import './index.scss';
import { GlobalContextProvider } from './context/global';
import { setProd } from './common/utils/prod';
import Login from './pages/login';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ProjectPage from './pages/project';
import Register from './pages/register';

setProd(false);

document.oncontextmenu = function(e) {
  return false;
};

const App: React.FC = () => {
  return (
    <DndProvider backend={Backend}>
      <div className="App">
        <GlobalContextProvider>
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/layout" component={Layout} />
            <Route exact path="/project" component={ProjectPage} />
          </BrowserRouter>
        </GlobalContextProvider>
        <div id="root-append"></div>
      </div>
    </DndProvider>
  );
};

export default App;
