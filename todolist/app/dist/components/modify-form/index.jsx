import React from 'react';
import handler from './handler';

export default handler(({ onChangeHandler, data: { deadline,comment } }) =>
  <div styleName="modify-form">
    <div styleName="modify-form-row">
      <div styleName="subtitle">
        <i styleName="fa fa-calendar"/> Deadline
      </div>
      <div>
        <input
          styleName="text-field"
          type="text"
          placeholder="yyyy/mm/dd"
          onChange={onChangeHandler('deadline')}
          value={deadline}
        />{' '}
        <input styleName="text-field" type="text" placeholder="hh:mm"/>
      </div>
    </div>
    <div styleName="modify-form-row">
      <div styleName="subtitle">
        <i styleName="fa fa-file-o"/> File
      </div>
      <div/>
    </div>
    <div styleName="modify-form-row">
      <div styleName="subtitle">
        <i styleName="fa fa-commenting-o"/> Comment
      </div>
      <div>
        <textarea
          styleName="multi-text-field"
          onChange={onChangeHandler('comment')}
          value={comment}
          placeholder="Type your memo here…"
        />
      </div>
    </div>
  </div>
);
