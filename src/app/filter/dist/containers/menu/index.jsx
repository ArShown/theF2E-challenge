import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Member from '../member';
import Week from '../week';
import Tags from '../tags';
import Late from '../late';
import Email from '../email';

export default () => <List dense={false}>
  <ListItem>
    <ListItemText>
      <div>報名人數</div>
      <Member/>
    </ListItemText>
  </ListItem>
  <Divider/>
  <ListItem>
    <ListItemText>
      <div>挑戰週數</div>
      <Week/>
    </ListItemText>
  </ListItem>
  <Divider light/>
  <ListItem>
    <ListItemText>
      <div>技能標籤</div>
      <Tags/>
    </ListItemText>
  </ListItem>
  <Divider light/>
  <ListItem>
    <ListItemText>
      <div>逾期繳交</div>
      <Late />
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <div>目標查詢</div>
      <Email />
    </ListItemText>
  </ListItem>
</List>
