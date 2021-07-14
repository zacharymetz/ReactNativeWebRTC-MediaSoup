
export const events = [{
    latitude : 51.041,
    longitude : -114.071, 
    capcaityPercentage : 0.75, 
    label : "Bar Crawl", 
    startTime: new Date(new Date().getTime() + (1000*60*60*4)), 
    eventID : 1
},{
    latitude : 51.043,
    longitude : -114.073, 
    capcaityPercentage : 0.5, 
    label : "BBQ Night", 
    startTime: new Date(new Date().getTime() + (1000*60*60*3)), 
    eventID : 2
}]

export const eventNumbers = [{
    latitude : 51.042,
    longitude : -114.072, 
    numberOfEvents : 2
}]


export const userProfile = {
  username : "MasterSeargentXx",
  firstName : "John",
  lastName : "Smith",
  level : 1,
  pointsUntilNextLevel : 125,
  points : 25,
  weeklyPoints : 25,
  numberOfBadges : 0,
  profileImageUrl : "https://via.placeholder.com/256.png"
};

export const missionFeedList = [
  {
      id : 1,
      title : "Speak Out against this Hate Speech",
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
  },
  {
    id : 2,
    title : "Speak Out against this Hate Speech",
    platform : "facebook",
    description : "This channel recently posted a video condoning the treatment of minorites in the 20s and saying its a better time.",
    imageUrl : "https://picsum.photos/2000/3000",
    expires : new Date(),
    pointValue : 25,
    completed : false,
    actionUrl : "",
    tags : [
        "30 Seconds",
        "Hate",
        "Report"
    ]
},
{
    id : 3,
    title : "Speak Out against this Hate Speech",
    platform : "instagram",
    description : "This channel recently posted a video condoning the treatment of minorites in the 20s and saying its a better time.",
    imageUrl : "https://picsum.photos/2000/3000",
    expires : new Date(),pointValue : 25,
    completed : false,
    actionUrl : "",
    tags : [
        "30 Seconds",
        "Hate",
        "Report"
    ]
},
{
    id : 4,
    title : "Speak Out against this Hate Speech",
    platform : "reddit",
    description : "This channel recently posted a video condoning the treatment of minorites in the 20s and saying its a better time.",
    imageUrl : "https://picsum.photos/2000/3000",
    expires : new Date(),pointValue : 25,
    completed : false,
    actionUrl : "",
    tags : [
        "30 Seconds",
        "Hate",
        "Report"
    ]
},
{
    id : 5,
    title : "Speak Out against this Hate Speech",
    platform : "tiktok",
    description : "This channel recently posted a video condoning the treatment of minorites in the 20s and saying its a better time.",
    imageUrl : "https://picsum.photos/2000/3000",
    expires : new Date(),pointValue : 25,
    completed : false,
    actionUrl : "",
    tags : [
        "30 Seconds",
        "Hate",
        "Report"
    ]
},
{
    id : 6,
    title : "Speak Out against this Hate Speech",
    platform : "twitter",
    description : "This channel recently posted a video condoning the treatment of minorites in the 20s and saying its a better time.",
    imageUrl : "https://picsum.photos/2000/3000",
    expires : new Date(),pointValue : 25,
    completed : false,
    actionUrl : "",
    tags : [
        "30 Seconds",
        "Hate",
        "Report"
    ]
},
{
    id : 7,
    title : "Speak Out against this Hate Speech",
    platform : "linkedin",
    description : "This channel recently posted a video condoning the treatment of minorites in the 20s and saying its a better time.",
    imageUrl : "https://picsum.photos/2000/3000",
    expires : new Date(),pointValue : 25,
    completed : false,
    actionUrl : "",
    tags : [
        "30 Seconds",
        "Hate",
        "Report"
    ]
}
];

export const dailyChallengesList = [
    {
        id  : 1,
        title : "Complete 3 Missions",
        description : "Complete any 3 missions to complete this challenge",
        imageUrl : "https://picsum.photos/2000/3000",
        expires : new Date(),
        reward : {
            isBadge : false,
            badgeID : null,
            points : 250
        },
        progress : {
            percent : .30
        }
    },
    {
        id  : 2,
        title : "Create a Reddit Account",
        imageUrl : "https://picsum.photos/2000/3000",
        expires : new Date(),
        reward : {
            isBadge : true,
            badgeID : 1,
            points : 0
        },
        progress : {
            percent : 1
        }
    }
    ,
    {
        id  : 3,
        title : "Suggest A Mission",
        imageUrl : "https://picsum.photos/2000/3000",
        expires : new Date(),
        reward : {
            isBadge : false,
            badgeID : null,
            points : 50
        },
        progress : {
            percent : 0
        }
    }
    
];

const factLibary = [
    {
        type : "folder",
        name : "folder 1",
        factLibary : [
            {
                type : "folder",
                name : "Memes",
                factLibary : [
                    {
                        type : "image",
                        name : "Meme1",
                        thumbnail : "https://via.placeholder.com/728x980.png"
                    },
                    {
                        type : "image",
                        name : "Meme2",
                        thumbnail : "https://via.placeholder.com/728x980.png"
                    }
                ]
            },
            {
                type : "doc",
                name : "Talking Points",
            }
        ]
    },
    {
        type : "folder",
        name : "folder 2",
        factLibary : []
    },
    {
        type : "folder",
        name : "folder 3",
        factLibary : []
    },
    {
        type : "folder",
        name : "folder 3",
        factLibary : []
    },
    {
        type : "folder",
        name : "folder 3",
        factLibary : []
    },
    {
        type : "folder",
        name : "folder 3",
        factLibary : []
    },
    {
        type : "folder",
        name : "folder 3",
        factLibary : []
    },
    {
        type : "folder",
        name : "folder 3",
        factLibary : []
    }
];

const badgeList = [{
    id : 1,
    title : "Starter badge",
    iconUrl : "",
    doesUserHave : true
},{
    id : 2,
    title : "Stoping Hate",
    iconUrl : "",
    doesUserHave : false
},{
    id : 3,
    title : "Out and About",
    iconUrl : "",
    doesUserHave : false
}];

const leaderBoards = [{
    title : "Top Users Of All time",
    leaders : [
        {
            id : 1,
            username : "Mustafa",
            points : 1000
        },
        {
            id : 2,
            username : "DONTHERAGECAGE",
            points : 950
        },
        {
            id : 3,
            username : "Jeff Perl",
            points : 925
        }
    ]
},{
    title : "Top Users Of of this month",
    leaders : [
        {
            id : 1,
            username : "Mustafa",
            points : 600
        },
        {
            id : 2,
            username : "DONTHERAGECAGE",
            points : 400
        },
        {
            id : 3,
            username : "Jeff Perl",
            points : 350
        }
    ]
}]

const dummyData = {
  userProfile,
  missionFeedList,
  dailyChallengesList,
  factLibary,
  badgeList,
  leaderBoards,
  events,
  eventNumbers
};

export default dummyData;
