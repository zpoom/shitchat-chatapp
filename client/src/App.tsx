import React from 'react';
import { Button } from 'antd';
import { Switch, Link, BrowserRouter as Route } from 'react-router-dom';
import { Home } from './pages';

function App() {
  return (
    <div className="App">
      <Route>
        <Switch>
          <Link to='/' component={Home} />
        </Switch>
      </Route>
    </div>
  );
}

export default App;
