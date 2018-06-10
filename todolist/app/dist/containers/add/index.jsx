import React from 'react';
import handler from './handler';
import Checkbox from '~/components/checkbox';
import Important from '~/components/important';
import ModifyForm from '~/components/modify-form';

export default handler(
  ({
    triggerHandler,
    inputHandler,
    cancel,
    submit,
    setInputEl,
    isLegal,
    modifyMode,
    completed,
    important,
    content,
    file,
    comment,
    deadline,
    setContent,
    toggleField,
    setField
  }) =>
    <div styleName={`add-frame ${modifyMode ? 'add-mode' : ''}`}>
      <div styleName="trigger" onClick={triggerHandler}>
        <div styleName="trigger-checkbox" onClick={toggleField('completed', completed)}>
          <Checkbox modifyMode={modifyMode} isChecked={completed}/>
        </div>
        <div styleName="trigger-content">
          <div styleName="trigger-msg">Add Task</div>
          <input
            styleName="add-input"
            ref={setInputEl}
            placeholder="Type Something Here…"
            value={content}
            onChange={setContent}
          />
        </div>
        <div styleName="trigger-icon" onClick={toggleField('important', important)}>
          <Important isChecked={important}/>
        </div>
        <div styleName="trigger-icon edit fa fa-pencil"/>
      </div>
      <div styleName="create-form">
        <div styleName="create-form-body container">
          <ModifyForm setField={setField} data={{
            content,
            file,
            comment,
            deadline
          }}/>
        </div>
        <div styleName="create-form-footer">
          <div styleName="btn cancel" onClick={cancel}>
            <i styleName="fa fa-remove"/>
            Cancel
          </div>
          <div styleName="btn add" onClick={submit} disabled={!isLegal}>
            <i styleName="fa fa-plus"/>
            Add Task
          </div>
        </div>
      </div>
    </div>
);
