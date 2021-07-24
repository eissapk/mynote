import { Service } from "olum";

class Engine extends Service {
  query = null
  constructor() {
    super("Engine");
  }

}

export const engine = new Engine();
