import { compose, withStyle } from '~/core/container';
import { withState } from 'recompose';
import index from './index.scss';

export default compose(withState('active', 'setActive', 'todo'), withStyle(index));