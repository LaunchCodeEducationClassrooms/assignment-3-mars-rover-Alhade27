class Rover {
  constructor(position){
    this.position=position;
    this.mode="NORMAL";
    this.generatorWatts=110;
  }

  recieveMessage(message)
    {
      if(message.constructor.name!=="Message")
        {
          return false
        }
      let name=message.name;
      let results=[];
      let canMove;
      if(this.mode="NORMAL")
        {
          canMove=true;
        } else
        {
          canMove=false;
        }

      if(message.commands!==undefined){
      for(let command of message.commands){
        if(command.commandType==="MOVE")
          {
            for(let i=0;i<message.commands.length;i++)   //Reloops to see if low power is also a command provided
              {
                if(message.commands[i].value==="LOW_POWER")
                  {
                    canMove=false;
                  }
                  else if (message.commands[i].value==="NORMAL")
                  {
                    canMove=true;
                  }
                
              }
            if(canMove===true)
              {
                this.position=command.value;
                results.push({completed:true});
              } else {
                results.push({completed:false});
              }
          }


        if(command.commandType==="MODE_CHANGE")
          {
            if(command.value==="LOW_POWER")
              {
                this.mode="LOW_POWER";
                results.push({completed:true});
              }
              else if (command.value==="NORMAL")
                {
                  this.mode="NORMAL";
                  results.push({completed:true});
                }
          }


        if(command.commandType==="STATUS_CHECK")
          {
            results.push({completed:true,roverStatus:{mode:this.mode,generatorWatts:this.generatorWatts,position:this.position}})
          }
      }
      }
      return {Message:name,results:results}
    }
}

module.exports = Rover;
