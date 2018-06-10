import { compose, withStyle } from '~/core/container';
import { withHandlers } from 'recompose';
import checkbox from './checkbox.scss';

export default compose(
  withHandlers({
    clickHandler: ({ modifyMode, onClick }) => () => {
      if (modifyMode) onClick();
      return false;
    }
  }),
  withStyle(checkbox)
);
