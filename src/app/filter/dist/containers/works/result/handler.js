import { compose, withStore } from '../../../core/container/index';
import { emit } from '../../../core/action/effects';
import { STORE_KEY as WORK_STORE_KEY } from '../../../storage/reducer/work';

export default withStore(`${WORK_STORE_KEY}.filter`);
