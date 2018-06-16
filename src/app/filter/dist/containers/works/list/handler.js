import { compose, withStore ,withStyle} from '~/core/container/index';
import { STORE_KEY as WORK_STORE_KEY } from '~/storage/reducer/work';
import list from './list.scss';

export default compose(withStore(`${WORK_STORE_KEY}.filter`),withStyle(list));
