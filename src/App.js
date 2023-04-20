import { useState } from 'react';

import Presence from './components/presence/presence';

import './App.css';

const serviceUrl = 'ws://localhost/ws';

function App() {
  const [currentUser, setCurrentUser] = useState('Anthony Hazuka');
  const [maxAvatarCount, setMaxAvatarCount] = useState(3);
  const [gap, setGap] = useState(-5);
  const [avatarSize, setAvatarSize] = useState(36);

  const handleChangeCurrentUser = (e) => {
    setCurrentUser(e.target.value);
  };

  const handleChangeMaxAvatarCount = (e) => {
    setMaxAvatarCount(Number(e.target.value));
  };

  const handleChangeGap = (e) => {
    setGap(Number(e.target.value));
  };

  const handleChangeAvatarSize = (e) => {
    setAvatarSize(Number(e.target.value));
  };

  return (
    <div className='App'>
      <form>
        <div>
          <label>Current User</label>
          <input
            placeholder='Current User'
            onChange={handleChangeCurrentUser}
            value={currentUser}
          />
        </div>
        <div>
          <label>Visible Avatar Count</label>
          <input
            placeholder='Visible Avatar Count'
            type='number'
            min={0}
            onChange={handleChangeMaxAvatarCount}
            value={maxAvatarCount}
          />
        </div>
        <div>
          <label>Gap</label>
          <input
            placeholder='Gap'
            type='number'
            onChange={handleChangeGap}
            value={gap}
          />
        </div>
        <div>
          <label>Avatar Size</label>
          <input
            placeholder='Avatar Size'
            type='number'
            onChange={handleChangeAvatarSize}
            value={avatarSize}
          />
        </div>
      </form>
      <div className='flex'>
        <h2>Channel 1</h2>
        <Presence
          channel='channel 1'
          gap={gap}
          currentUser={currentUser}
          serviceUrl={serviceUrl}
          maxAvatarCount={maxAvatarCount}
          avatarSize={avatarSize}
        />
      </div>
      <div className='flex'>
        <h2>Channel 2</h2>
        <Presence
          channel='channel 2'
          gap={gap}
          currentUser={currentUser}
          serviceUrl={serviceUrl}
          maxAvatarCount={maxAvatarCount}
          avatarSize={avatarSize}
        />
      </div>
      <div className='flex'>
        <h2>Channel 1</h2>
        <Presence
          channel='channel 1'
          gap={gap}
          currentUser={currentUser}
          serviceUrl={serviceUrl}
          maxAvatarCount={maxAvatarCount}
          avatarSize={avatarSize}
        />
      </div>
    </div>
  );
}

export default App;
