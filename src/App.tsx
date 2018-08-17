import * as React from 'react'
import SendBird from 'sendbird'

const sb = new SendBird({
  appId: '9F0BAC98-572F-457B-B0CE-55F334A17550',
})

interface State {}

export default class App extends React.Component<{}, State> {

  componentDidMount() {
    sb.connect('kazuya' + String(Math.random()), (user, err) => {
      console.log(user)
      console.log(err)
    })

    sb.OpenChannel.createChannel('#general', '', '', function(channel, error) {
      if (error) {
        console.error(error);
        return;
      }

      // onCreated
      console.log(channel);

      channel.enter(function(response, error){
        if (error) {
          console.error(error);
          return;
        }
      });

      channel.sendUserMessage('hello', 'hello', 'default', function(message, error){
        if (error) {
          console.error(error);
          return;
        }

        // onSent
        console.log(message);
      });

      const ChannelHandler = new sb.ChannelHandler();

      ChannelHandler.onMessageReceived = function(channel, message){
        console.log(channel, message);
      };

      sb.addChannelHandler('#general', ChannelHandler);

      const messageListQuery = channel.createPreviousMessageListQuery();

      messageListQuery.load(30, true, function(messageList, error){
        if (error) {
          console.error(error);
          return;
        }
        console.log(messageList);
      });
    });
  }

  render() {
    return <div>hello</div>
  }
}
