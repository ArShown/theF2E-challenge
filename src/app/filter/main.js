import React from 'react';
import { render } from 'react-dom';
import router from '~/core/router';

render(
  router({
    routerIndex: '/'
  }),
  document.getElementById('container')
);
