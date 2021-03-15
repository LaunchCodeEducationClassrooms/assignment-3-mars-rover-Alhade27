const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it('constructor sets position and default values for mode and generatorWatts',function(){
    let rover=new Rover(30);
    expect(rover.position).toEqual(30);
    expect(rover.generatorWatts).toEqual(110);
  });

  it('response returned by receiveMessage contains name of message',function(){
    let rover=new Rover();
    let message=new Message("default")
    expect(rover.recieveMessage(message).Message).toEqual("default");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let rover=new Rover();
    let message=new Message("default","STATUS_CHECK");
    let i=0;
    for(items in rover.recieveMessage(message)){i++;}
    expect(i).toEqual(2);
  })

  it("responds correctly to status check command",function(){
      let status=new Command("STATUS_CHECK");
      let rover = new Rover(10);
      let message = new Message('hello',[status]);
      let response = rover.recieveMessage(message);
      expect(response.results[0].roverStatus).toEqual({mode:"NORMAL",generatorWatts:110,position:10});
  });

  it("responds correctly to mode change command",function(){
    let rover=new Rover();
    let mode1=new Command("MODE_CHANGE","NORMAL");
    let mode2=new Command("MODE_CHANGE","LOW_POWER");
    let message1=new Message("normal",[mode1]);
    let message2=new Message('lowPower',[mode2]);
    expect(rover.recieveMessage(message1).results).toEqual([{completed:true}]);
    expect(rover.mode).toEqual(mode1.value);
    expect(rover.recieveMessage(message2).results).toEqual([{completed:true}]);
    expect(rover.mode).toEqual(mode2.value);
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
    let rover = new Rover(1);
    let move=new Command("MOVE",204932);
    let lowPower=new Command("MODE_CHANGE","LOW_POWER");
    let message=new Message("Low power test",[move,lowPower]);
    expect(rover.recieveMessage(message).results[0]).toEqual({completed:false});
  });

  it("responds with position for move command",function(){
    let rover=new Rover(30);
    let move=new Command("MOVE",650423);
    let normal=new Command("MODE_CHANGE","NORMAL");
    let message=new Message("test",[normal,move]);
    rover.recieveMessage(message);
    expect(rover.position).toEqual(move.value);
  });
  // 7 tests here!

});
