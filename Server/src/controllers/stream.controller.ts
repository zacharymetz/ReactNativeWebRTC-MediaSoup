import { CreateMissionDto, MissionQueryDto,CompleteMissionDto } from '@/dtos/mission.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import adminMiddleware from '@/middlewares/admin.middleware';
import { Body, Controller, Get, Param, Post, Req, UseBefore } from 'routing-controllers';
import MissionService from '../services/mission.service';


@Controller()
export class StreamController {
    public missionService = new MissionService()


    @Get('/api/stream/new_stream')
    @UseBefore(authMiddleware)
    async getMissions(@Body() missionQuery: MissionQueryDto) {
      const queryResults = await this.missionService.queryMissions(missionQuery);
      return queryResults;
      
    }

    
    @Get('/api/stream/new_streamer_to_stream')
    @UseBefore(authMiddleware)
    async getMission(@Param('id') missionId: number) {
      
      const mission = await this.missionService.getMissionById(missionId);
      return mission;
    }

    @Post('/api/stream/kick_streamer')
    @UseBefore(authMiddleware)
    async kick_streamer(@Body() missionData: CompleteMissionDto,@Req() req: RequestWithUser) {
      // just return a true or false to the user to see if the mission is done
      const missionComplete = await this.missionService.consumeActionUrlForMission(missionData.id,req.user.id)
      return missionComplete;
    }


    @Post('/api/stream/end_stream')
    @UseBefore(authMiddleware)
    async end_stream(@Body() missionData: CompleteMissionDto,@Req() req: RequestWithUser) {
      // just return a true or false to the user to see if the mission is done
      const missionComplete = await this.missionService.consumeActionUrlForMission(missionData.id,req.user.id)
      return missionComplete;
    }

    

}
