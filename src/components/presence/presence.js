import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useWebSocket } from '../../hooks/use-web-socket';

import './presence.css';

function Presence({
  channel,
  serviceUrl,
  maxAvatarCount = 3,
  gap = 0,
  avatarSize = 24,
  currentUser,
}) {
  const { subscribe, unsubscribe, listen, status } = useWebSocket(serviceUrl);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    subscribe(channel);

    listen(channel, (data) => {
      if (typeof data === 'object') {
        if (data.type === 'userList') {
          setUserList(data.payload);
        }
      }
    });

    return () => {
      unsubscribe(channel);
    };
  }, [channel, listen, status, subscribe, unsubscribe]);

  const users = useMemo(
    () => userList.filter((user) => user.username !== currentUser),
    [userList, currentUser]
  );

  return (
    <ul className='avatar-list'>
      {users.slice(0, maxAvatarCount).map((user) => (
        <li
          key={user.username}
          title={`${user.name} (${user.username})`}
          style={{ marginLeft: gap }}
        >
          <img
            className='avatar'
            width={avatarSize}
            height={avatarSize}
            src={user.imageUrl}
            alt={user.username}
          />
        </li>
      ))}
      {users.length > maxAvatarCount && (
        <li
          className='avatar-extra'
          style={{ marginLeft: gap, width: avatarSize, height: avatarSize }}
          title={users
            .slice(maxAvatarCount)
            .map((user) => `${user.name} (${user.username})`)
            .join(', ')}
        >
          + {users.length - maxAvatarCount} more
        </li>
      )}
    </ul>
  );
}

export default Presence;

Presence.propTypes = {
  channel: PropTypes.string.isRequired,
  serviceUrl: PropTypes.string.isRequired,
  maxAvatarCount: PropTypes.number,
  gap: PropTypes.number,
  avatarSize: PropTypes.number,
  currentUser: PropTypes.string,
};

Presence.defaultProps = {
  maxAvatarCount: 3,
  gap: 0,
  avatarSize: 32,
  currentUser: '',
};
