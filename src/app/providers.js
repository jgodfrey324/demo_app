'use client';

import { wrapper } from '../store';
import { useWrappedStore } from 'next-redux-wrapper';
import { Provider } from 'react-redux';

export default function Providers({ children }) {
  const { store } = useWrappedStore();
  return <Provider store={store}>{children}</Provider>;
}
