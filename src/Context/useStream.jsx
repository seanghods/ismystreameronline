import { useContext } from 'react';
import { StreamContext } from './StreamContext';

export default function useStream() {
  return useContext(StreamContext);
}
