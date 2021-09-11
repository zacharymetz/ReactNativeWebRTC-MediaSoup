
export const events = [{
    latitude : 51.041,
    longitude : -114.071, 
    capcaityPercentage : 0.75, 
    label : "Bar Crawl", 
    description : "Lets kick back and enjoy some of the best micro brewires calgay has to offer. we are planning to hit 3 within the same block tonight!",
    startTime: new Date(new Date().getTime() + (1000*60*60*4)), 
    eventID : 1
},{
    latitude : 51.043,
    longitude : -114.073, 
    capcaityPercentage : 0.5, 
    label : "BBQ Night", 
    description : "Lets kick back and enjoy some of the best micro brewires calgay has to offer. we are planning to hit 3 within the same block tonight!",
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

const dummyData = {
  userProfile,
  events,
  eventNumbers
};

export default dummyData;
