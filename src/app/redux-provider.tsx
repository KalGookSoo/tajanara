'use client';

import React, { JSX } from 'react';
import { Provider } from 'react-redux';
import store from '@/shared/lib/state';

type Props = {
  children: React.ReactNode;
};

const ReduxProvider = ({ children }: Props): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
