import React from 'react';
import { Button } from 'antd';
import { Switch, Link, BrowserRouter as Route } from 'react-router-dom';
import { Home } from './pages';
import Lobby from './pages/Lobby';

function App() {
  return (
    <div className="App">
      <Route>
        <Switch>
          <Link to='/lobby' component={Lobby} />
          <Link to='/' component={Home} />
        </Switch>
      </Route>
    </div>
  );
}

export default App;
