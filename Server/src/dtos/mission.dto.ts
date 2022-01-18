import { HowToSteps, MissionReward } from "@/interfaces/mission.interface";

export class MissionQueryDto {

    public platform?:string;
    public limit?:number;
    public offset?:number;
    public orderBy?:string;

}

export class CompleteMissionDto {
    id:number;
}


export class CreateMissionDto {
  title:string;
  platform:string;
  headerImageId:string;
  description:string;
  actionUrl:string;
  dateCreated:Date;
  dateExpirtes:Date;
  howToSteps:HowToSteps[];
  reward:MissionReward;
}
  