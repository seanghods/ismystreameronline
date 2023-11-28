import { DOMAIN } from '../../utils/constants';

export default function EmbedPlayer({
  streamer,
  activeDropdown,
  shouldRenderContent,
}) {
  function getEmbed(streamer) {
    switch (streamer.platform) {
      case 'Twitch':
        return (
          <div className="flex w-full justify-center items-center flex-col md:flex-row">
            <iframe
              src={`https://player.twitch.tv/?channel=${streamer.name}&parent=${DOMAIN}`}
              allowFullScreen={true}
              height="378"
              className="w-full md:w-[550px] lg:w-[450px] xl:w-[620px]"
            ></iframe>
            <iframe
              id="chat_embed"
              src={`https://www.twitch.tv/embed/${streamer.name}/chat?darkpopout&parent=${DOMAIN}`}
              height="378"
              className="w-full md:w-[300px] 2xl:w-[400px] md:block"
            ></iframe>
          </div>
        );
      case 'Kick':
        return (
          <div className="flex flex-col md:flex-row">
            <iframe
              src={`https://player.kick.com/${streamer.name}`}
              className="w-screen md:w-[550px] lg:w-[450px] xl:w-[620px]"
              height="378"
              allowFullScreen={true}
            ></iframe>
            <iframe
              src={`https://kick.com/${streamer.name}/chatroom`}
              height="378"
              className="w-full md:w-[300px] 2xl:w-[400px] md:block"
              allowFullScreen={true}
            ></iframe>
          </div>
        );
      case 'YouTube':
        return (
          <div className="flex flex-col md:flex-row">
            <iframe
              className="w-screen md:w-[550px] lg:w-[450px] xl:w-[620px]"
              height="378"
              src={`https://www.youtube.com/embed/live_stream?channel=${streamer.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <iframe
              className="w-full md:w-[300px] 2xl:w-[400px] md:block"
              height="378"
              src={`https://www.youtube.com/live_chat?v=${streamer.titleId}&embed_domain=${DOMAIN}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        );
      default:
        return;
    }
  }
  return (
    <div
      className={`flex justify-center items-center ${
        streamer.platform == 'Twitch'
          ? 'bg-twitch'
          : streamer.platform == 'Kick'
          ? 'bg-kick bg-cover bg-no-repeat bg-right'
          : streamer.platform == 'YouTube'
          ? 'bg-youtube bg-cover bg-no-repeat bg-right'
          : null
      } origin-top rounded-b-md transition-transform ease-out duration-300 transform ${
        activeDropdown.includes(streamer.id)
          ? 'scale-y-100 h-[750px] md:h-[400px]'
          : 'scale-y-0'
      }`}
    >
      {activeDropdown.includes(streamer.id) &&
        shouldRenderContent[streamer.id] &&
        getEmbed(streamer)}
    </div>
  );
}
