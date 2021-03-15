class Message {
  constructor(name,commands){
    this.name=name;
    if(!this.name){
      throw Error("Message name required.");
    }
    this.commands=commands;
  }
}

module.exports = Message;