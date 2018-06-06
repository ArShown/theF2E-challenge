class Task {
  id: number;
  order: number;
  content: string;
  deadline: ?string;
  important: boolean;
  comment: string;
  file: ?string;
  status: 'TODO' | 'PROGRESS' | 'COMPLETED';

  constructor() {
    this.id = this._createRandomKey();
    this.order = 0;
    this.content = '';
    this.deadline = null;
    this.important = false;
    this.comments = '';
    this.file = null;
    this.status = 'TODO';
  }

  _createRandomKey() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  }
}

export default Task;