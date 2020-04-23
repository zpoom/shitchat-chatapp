import React from 'react';
import { Button } from 'antd';
import { Switch, Link, BrowserRouter as Route } from 'react-router-dom';
import { Home } from './pages';
import Lobby from './pages/Lobby';
import io from 'socket.io-client';

function App() {
  const socket = io('http://localhost:8080');
  socket.on('joined', (res: any) => {
    console.log(res);
  });
  const handleJoinGroup = () => {
    socket.emit('join', { groupname: 'test', username: 'test' });
  }
  return (
    <div className="App">
      {/* <Route>
        <Switch>
          <Link to='/lobby' component={Lobby} />
          <Link to='/' component={Home} />
        </Switch>
      </Route> */}
      <Button onClick={handleJoinGroup}>
        join
  </Button>
    </div>
  );
}

export default App;
