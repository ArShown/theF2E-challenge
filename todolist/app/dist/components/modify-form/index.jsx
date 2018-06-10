import React from 'react';
import handler from './handler';

export default handler(
  ({
    onChangeHandler,
    data: { deadline: { date, time }, comment},
    changeDate, changeTime
  }) =>
    <div styleName="modify-form">
      <div styleName="modify-form-row">
        <div styleName="subtitle">
          <i styleName="fa fa-calendar" /> Deadline
        </div>
        <div>
          <input
            styleName="text-field"
            type="text"
            placeholder="yyyy/mm/dd"
            onChange={changeDate}
            value={date}
          />{' '}
          <input
            styleName="text-field"
            type="text"
            placeholder="hh:mm"
            value={time}
            onChange={changeTime}
          />
        </div>
      </div>
      <div styleName="modify-form-row">
        <div styleName="subtitle">
          <i styleName="fa fa-file-o" /> File
        </div>
        <div />
      </div>
      <div styleName="modify-form-row">
        <div styleName="subtitle">
          <i styleName="fa fa-commenting-o" /> Comment
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
