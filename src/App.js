import { useState } from 'react';

import './App.css';

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
    </div>
  );
}

export default App;
