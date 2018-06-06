import { compose, withStyle } from '~/core/container';
import { withStateHandlers, withHandlers } from 'recompose';
import nav from './nav.scss';

export default compose(
  withStateHandlers(({ active }) => ({
    hoverActive: active
  }), {
    setHoverActive: () => navName => ({ hoverActive: navName })
  }),
  withHandlers({
    hoverEvent: ({ setHoverActive }) => navName => () => {
      setHoverActive(navName);
    },
    setActive: ({ setActive }) => navName => () => {
      setActive(navName);
    }
  }),
  withStyle(nav)
);