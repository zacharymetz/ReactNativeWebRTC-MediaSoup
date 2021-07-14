import { Controller, Get } from 'routing-controllers';
import MissionService from '../services/mission.service';


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


@Controller()
export class MissionController {
    public missionService = new MissionService()
  @Get('/api/v0/mission/getMission/:id')
  async getMission() {
    await delay(3000)
    return  {
        id : 1,
        title : "Speak Out against this Hate Speep",
        platform : "youtube",
        description : "This channel recently posted a video condoning the treatment of minorites in the 20s and saying its a better time.",
        imageUrl : "https://picsum.photos/2000/3000",
        expires : new Date(),
        pointValue : 25,
        completed : true,
        actionUrl : "",
        tags : [
            "30 Seconds",
            "Hate",
            "Report"
        ]
    }
  }
  @Get('/api/v0/mission/getMissionFeed')
  async index() {
    
    await delay(3000)
    return this.missionService.getDummyMissionData()
  }
}
