import { Service } from "olum";

class Api extends Service {
  current = {};
  editedNote = {};
  key = "myNoteApp";
  tabKey = this.key + "_lastTab";
  constructor() {
    super("currentTab");
  }

  addNote(obj) {
    const data = this.get();
    obj.index = data.length;
    data.push(obj);
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  get() {
    let data;
    if (localStorage.getItem(this.key) === null) {
      data = [];
      localStorage.setItem(this.key, JSON.stringify(data));
    } else {
      data = JSON.parse(localStorage.getItem(this.key));
    }
    return data;
  }

  editTab() {
    const data = this.get();
    data.forEach(obj => {
      if (obj.tabId === this.current.tabId) {
        obj.tabName = this.current.tabName;
      }
    });

    localStorage.setItem(this.key, JSON.stringify(data));
  }

  removeTab(id) {
    const filteredArr = this.get().filter(obj => obj.tabId !== id);
    localStorage.setItem(this.key, JSON.stringify(filteredArr));
  }

  removeNotes(arr) {
    const data = this.get();
    for (let id of arr) {
      data.forEach((obj, index, array) => {
        if (obj.noteId === id) {
          array.splice(index, 1);
        }
      });
    }
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  editNote({ newContent, id }) {
    const data = this.get();
    data.forEach(obj => (obj.noteId === id ? (obj.noteContent = newContent) : ""));
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  saveLastTab() {
    localStorage.setItem(this.tabKey, JSON.stringify(this.current.tabId));
  }

  hasLastTab() {
    if (localStorage.getItem(this.tabKey) === null) {
      return false;
    }
    return JSON.parse(localStorage.getItem(this.tabKey));
  }

  getNotesNum(tabId) {
    const num = this.get().filter(obj => obj.tabId === tabId).length;
    return num;
  }

  getOldNoteContent(id) {
    const noteObj = this.get().find(obj => (obj.noteId === id ? obj : ""));
    return noteObj.noteContent;
  }

  arrange(sortedArr) {
    const data = this.get();
    data.forEach(obj => sortedArr.forEach(item => (obj.noteId === item.noteId ? (obj.index = item.index) : "")));
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  updateStorage(rawData) {
    const parsedData = JSON.parse(rawData);
    if (parsedData.length) {
      localStorage.setItem(this.key, rawData);
    } else {
      alert("No Data in This File!");
    }
  }
}

const api = new Api();
export default api;
