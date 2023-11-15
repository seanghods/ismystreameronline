export default function EmbedPlayer({
  streamer,
  activeDropdown,
  shouldRenderContent,
}) {
  function getEmbed(streamer) {
    switch (streamer.platform) {
      case 'Twitch':
        return (
          <>
            <iframe
              src={`https://player.twitch.tv/?channel=${streamer.name}&parent=localhost`}
              allowFullScreen={true}
              height="378"
              width="620"
            ></iframe>
            <iframe
              id="chat_embed"
              className="hidden md:block"
              src={`https://www.twitch.tv/embed/${streamer.name}/chat?parent=localhost`}
              height="378"
              width="300"
            ></iframe>
          </>
        );
      case 'Kick':
        return (
          <iframe
            src={`https://player.kick.com/${streamer.name}`}
            height="378"
            width="620"
            allowFullScreen={true}
          ></iframe>
        );
      case 'YouTube':
        return (
          <div className="flex flex-col md:flex-row">
            <iframe
              className="w-[550px] lg:w-[500px] 2xl:w-[620px]"
              height="378"
              src={`https://www.youtube.com/embed/live_stream?channel=${streamer.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <iframe
              className="w-[200px] lg:w-[300px] 2xl:w-[400px] hidden md:block"
              height="378"
              src={`https://www.youtube.com/live_chat?v=${streamer.titleId}&embed_domain=localhost`}
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
          ? 'scale-y-100 h-[400px]'
          : 'scale-y-0'
      }`}
    >
      {activeDropdown.includes(streamer.id) &&
        shouldRenderContent[streamer.id] &&
        getEmbed(streamer)}
    </div>
  );
}
