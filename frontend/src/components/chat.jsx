import { useGetMessagesQuery } from "../redux/messages";
import { useGetChannelsQuery } from "../redux/channels";

const Channels = () => {
  const { data, error, isLoading, refetch } = useGetChannelsQuery();

  // render
  return <div> 
    <div className="overflow-auto">
      {isLoading.toString()}
    </div>
  </div>
  /*return (
    <div className={className}>
      <ChannelAdd channels={channels} />
      <div className="channels overflow-auto">
        {channels.allIds.map((id) => (
          <Channel
            key={id}
            channel={channels.byId[id]}
            channels={channels}
            isActive={id === currentChannelId}
          />
        ))}
      </div>
    </div>
  );*/
};

const Chat = () => {
  //const { data1, error1, isLoading1, refetch1 } = useGetMessagesQuery(token, { skip: (!username || !token) });
  //

  return <div className="d-flex flex-column justify-content-between py-2">
    <div>
      <div className="row">
        <div className="col-sm-3">
          <Channels />
        </div>
        <div className="col-sm-9">
          {/**<Messages />**/}
        </div>
      </div>
    </div>
    {/**<Input />**/}
  </div>;
};

export default Chat;