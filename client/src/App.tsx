import React from 'react';
import { Button } from 'antd';
import { Switch, Link, BrowserRouter , Route } from 'react-router-dom';
import { Home } from './pages';
import Lobby from './pages/Lobby';
import io from 'socket.io-client';

function App() {

  const socket = io('http://localhost:8080');
  socket.on('message', (res: any) => {
    console.log(res);
  }); 
  const handleJoinGroup = () => {
    socket.emit('join', { groupname: 'test', username: 'test' });
  }
  socket.emit('aaa')

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