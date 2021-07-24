import { Service } from "olum";
class DelNote extends Service {
  constructor() {
    super("delNote");
  }
}

const delNote = new DelNote();
export default delNote;
