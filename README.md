# React Chat Room Presence Component

This is a React component that shows the presence of users in a chat room. When a user joins or leaves the chat room, this component can be used to show a list of all the users who are currently online.

## Usage

To use this component, first import it into your React component:

```javascript
import Presence from 'components/presence';
```

Then, run a backend mock server that will handle web socket communication:

```bash
npm run server
```

Finally, use the `Presence` component to display the list of users in a specific channel:

```javascript
<Presence channel="channel 1" serviceUrl="ws://localhost/ws" />
```

You can also pass in additional props to customize the appearance of the component:

```javascript
<Presence
  channel="channel 1"
  gap={-5}
  currentUser="Carolyn"
  serviceUrl="ws://localhost/ws"
  maxAvatarCount={5}
  avatarSize={24}
/>
```

Here are the available props:

- `channel` (required): The name or ID of the chat room to monitor.
- `serviceUrl` (required): The URL of the chat service, used to fetch the status of online users.
- `currentUser`: The username of the current user. Used to indicate the current user in the list of online users.
- `maxAvatarCount`: The maximum number of avatars to display at once. Online users beyond this limit will be shown as "+X more" where X is the count of online users minus `maxAvatarCount`. Defaults to 3.
- `gap`: The gap between the avatars, in pixels. Defaults to 10.
- `avatarSize`: The size of the user avatar in pixels. Only applies if `showAvatar` is `true`. Defaults to `36`.

# Future

Some of the upcoming features that we are planning to integrate into this component are:

- Support for user statuses (online / offline / away, etc.)
- A customizable tooltip that will show more detailed user information (such as the user's bio or contact information)
- Integration with video chat, allowing users to easily start a video call with an online user

We are continuously improving and adding new features to this component. If you have any ideas or suggestions for features you would like to see, please let us know by opening an issue on our GitHub repository.

## Contributing

We welcome contributions to this project! To get started, clone the repository and run `npm install` to install the dependencies.

Then, you can run the development server with `npm start` to start a local development environment. You can run mock backend server with `npm run server`, and build the component for production with `npm run build`.

When contributing code, please follow the existing coding style before submitting a pull request.
