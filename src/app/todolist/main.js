import React from 'react';
import { render } from 'react-dom';
import router from '~/core/router';

render(
  router({
    routerIndex: '/index'
  }),
  document.getElementById('container')
);
