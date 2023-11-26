import { LoadingIcon } from '../components/sub-components/Icons';

export default function LoadingPage() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-[#f3f4f6] dark:bg-black flex flex-col justify-center items-center">
      <h1 className="text-2xl font-logo">Is My Streamer Online</h1>
      <LoadingIcon width="75" height="75" />
    </div>
  );
}
