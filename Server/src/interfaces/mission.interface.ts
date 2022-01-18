export interface Mission {
  id: number;
  title:string;
  platform:string;
  headerImageId:string;
  description:string;
  actionUrl:string;
  dateCreated:Date;
  dateExpirtes:Date;
  howToSteps?:HowToSteps[];
  reward?:MissionReward;
  dateCompleted?:Date; // if not completed the date will be null
}
  
export interface HowToSteps {
  id?: number; // if it does not have id then it is an unsaved one 
  headerImageId:string;
  description:string;
}

export interface MissionReward{
  id?: number; // if it dosent have one then it is a new one i am trying to save
  missionID:number;
  isBadge:boolean;
  badgeID?:number;
  pointValue?:number;
}