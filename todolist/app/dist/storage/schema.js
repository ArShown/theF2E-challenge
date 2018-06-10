class Task {
  id: number;
  order: number;
  content: string;
  deadline: string;
  important: boolean;
  completed: boolean;
  comment: string;
  file: ?string;

  constructor() {
    this.id = this._createRandomKey();
    this.order = 0;
    this.content = '';
    this.deadline = '';
    this.important = false;
    this.completed = false;
    this.comment = '';
    this.file = null;
  }

  _createRandomKey() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  }
}

export default Task;