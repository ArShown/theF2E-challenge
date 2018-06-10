import { compose, withStyle } from '~/core/container';
import { withState } from 'recompose';
import task from './task.scss';

export default compose(withState('active', 'setActive', 'todo'), withStyle(task));