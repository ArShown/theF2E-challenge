import workReducer from './reducer/work';
import tagReducer from './reducer/tag';
import memberReducer from './reducer/member';
import conditionReducer from './reducer/condition';
import { epics as epicTag } from './epic/tag';
import { epics as epicMember } from './epic/member';
import { epics as epicWork } from './epic/work';
import { epics as epicCondition } from './epic/condition';

export default {
  reducer: [workReducer, tagReducer, memberReducer, conditionReducer],
  epic: [...epicTag, ...epicMember, ...epicWork, ...epicCondition]
};
