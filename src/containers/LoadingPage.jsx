import { LoadingIcon } from '../components/sub-components/Icons';

export default function LoadingPage() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-[#f3f4f6] dark:bg-black flex justify-center items-center">
      <LoadingIcon />
    </div>
  );
}
