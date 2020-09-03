import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

const selectedConfigureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

// TODO: https://github.com/rt2zz/redux-persist

export const { configureStore } = selectedConfigureStore;

export const { history } = selectedConfigureStore;
