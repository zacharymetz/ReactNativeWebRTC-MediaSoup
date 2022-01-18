import { getDBClient } from '@/db';
import { CompleteMissionDto, CreateMissionDto, MissionQueryDto } from '@/dtos/mission.dto';
import { HowToSteps, Mission, MissionReward } from '@/interfaces/mission.interface';
import { Console } from 'console';


class MissionService {
  async consumeActionUrlForMission(missionID:number,userID:number){
    const dbClient = await getDBClient();
    await dbClient.createActionUrlConsumedActions(missionID,userID);
    return true;
  }
  async createMissionCompleteionRecord(missionID:number,userID:number) {
    // need to do a check to see if they have completed the mission yet 
    const dbClient = await getDBClient();
    const completeionStatus = await dbClient.getMissionCompletionStatus(missionID,userID);
    if(completeionStatus!= undefined){
      await dbClient.createMissionCompleteionRecord(missionID,userID);
      return true;
    }else{
      throw "Error, mission not completed yet"
    }
  }
  async getMissionById(missionId: number):Promise<Mission> {
    const dbClient = await getDBClient();

    const missionPromise = dbClient.getMissionById(missionId);
    const missionHowToPromise = dbClient.getMissionHowToStepsByMissionID(missionId);
    const missionRewardPromise = dbClient.getMissionRewardsByMissionID(missionId);

    const mission = await missionPromise;
    const missionHowTo = await missionHowToPromise;
    const missionReward = await missionRewardPromise;


    return {
      ...mission,
      howToSteps : missionHowTo,
      reward : missionReward
    };
  }
  async queryMissions(missionQuery: MissionQueryDto):Promise<Mission[]> {
    const dbClient = await getDBClient();
    const missionIDs = await dbClient.queryMissions(missionQuery);
    const missionsPromise =  dbClient.getMissionByIds(missionIDs);
    const missionsHowToPromise = dbClient.getMissionHowToStepsByMissionIDs(missionIDs);
    const missionsRewardPromise = dbClient.getMissionRewardsByMissionIDs(missionIDs);
    const missions = await missionsPromise;
    const missionsHowTo = await missionsHowToPromise;
    const missionsReward = await missionsRewardPromise;
    console.log({missions})
    // now lets zip them all together here (cuz lazinerr )
    const missionList:Mission[] = [];
    for(const mission of missions){
      // get the how tos , the facts and then add them 
      const reward = missionsReward.find(x=>x.missionID == mission.id);
      const howToSteps = missionsHowTo.filter(x=>x.missionId == mission.id);
     
      missionList.push({
        ...mission,
      howToSteps : howToSteps,
      reward : reward
      })

    }
    return missionList;
  }
  async createMission(missionData: CreateMissionDto):Promise<Mission> {
      const dbClient = await getDBClient();
      const mission = await dbClient.createMission(missionData.title,missionData.description,missionData.platform,missionData.actionUrl,missionData.headerImageId,missionData.dateExpirtes);
      return mission;
  }
  async createMissionHowToSteps(howToStepsData: HowToSteps[],missionID: number) {
      const dbClient = await getDBClient();
      const howTwoSteps = await dbClient.createMissionHowToSteps(howToStepsData,missionID);
      return howTwoSteps;
  }
    async createMissionRewards(missionRewardData: MissionReward,missionID: number) {
      const dbClient = await getDBClient();
      const missionReward = await dbClient.createMissionReward(missionRewardData,missionID);
      return missionReward;
    }
}

export default MissionService;