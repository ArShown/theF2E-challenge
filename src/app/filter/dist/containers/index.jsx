import React from 'react';
import { withStyle } from '../core/container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Menu from './menu';
import Works from './works';
import style from './index.scss';

export const SimpleAppBar = () =>
  <div styleName="container">
    <AppBar position="static" color="primary" style={{ boxShadow: 'none' }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="title" color="inherit" styleName="text-center">
              The F2E
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Grid container styleName="gird-container">
      <Grid item sm={12} md={4}>
        <div styleName="menu-list">
          <Menu/>
        </div>
      </Grid>
      <Grid item sm={12} md={8}>
        <div styleName="works-container">
          <Works/>
        </div>
      </Grid>
    </Grid>
  </div>;

export default withStyle(style)(SimpleAppBar);