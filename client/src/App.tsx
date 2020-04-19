import React from 'react';
import { Button } from 'antd';
import { Switch, Link, BrowserRouter , Route } from 'react-router-dom';
import { Home } from './pages';
import Lobby from './pages/Lobby';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/lobby' exact component={Lobby} />
          <Route path='/' exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;  