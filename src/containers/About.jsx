export default function About() {
  return (
    <div className="flex flex-col items-center gap-5 justify-center font-game">
      <h2 className="font-logo text-3xl mb-8">About</h2>
      <div className="w-4/5 md:w-1/2 text-left">
        My favorite streamers use to all stream from{' '}
        <span className="text-purple-200">Twitch</span>. Over the years, they
        have diversified out to <span className="text-red-200">YouTube,</span>
        <span className="text-green-200"> Kick,</span> and other streaming
        platforms. I made this website to have{' '}
        <span className="font-gamebold">one home</span> where I could see all my
        favorite streamers&apos; status, and watch their streams together.
      </div>
      <div className="w-4/5 md:w-1/2 text-left">
        The website is straightforward in its{' '}
        <span className="text-yellow-50">utility</span> for now but I have a lot
        of exciting features I&apos;m looking forward to adding to make the
        streaming viewing and discovery experience more enjoyable. I think
        platforms, <span className="text-red-200">YouTube</span> in particular,
        have many ways to go in advancing discoverability for their own
        streamers so I do hope this platform{' '}
        <span className="font-gamebold">can help</span>.
      </div>
      <div className="w-4/5 md:w-1/2 text-left">
        If you want to reach out, feel free to send me a message on twitter{' '}
        <a className="text-blue-200" href="twitter.com/seanXdev_">
          @seanXdev_
        </a>{' '}
        or send an email to{' '}
        <span className="text-green-200">ismystreameronline@gmail.com</span>. I
        enjoy hearing from visitors and listening to any suggestions you have to
        improve the site. Thanks for visiting!
      </div>
      <div className="w-4/5 md:w-1/2 text-left font-gamebold">-Sean Ghods</div>
      <div className="w-4/5 md:w-1/2 text-left mb-5 ">
        P.S. If you enjoy the website, please leave an upvote on a reddit threat
        you found it on or like my Product Hunt post here to increase its
        visibility.
      </div>
    </div>
  );
}
