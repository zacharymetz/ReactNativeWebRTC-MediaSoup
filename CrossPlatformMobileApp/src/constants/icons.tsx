import { ImageSourcePropType } from "react-native";

const back_arrow = require("../assets/icons/back_arrow.png");
const home = require("../assets/icons/home.png");
const line_graph = require("../assets/icons/line_graph.png");
const book = require("../assets/icons/book.png");
const notification_color = require("../assets/icons/notification_color.png");
const notification_white = require("../assets/icons/notification_white.png");
const pie_chart = require("../assets/icons/pie_chart.png");
const right_arrow = require("../assets/icons/right_arrow.png");
const settings = require("../assets/icons/settings.png");
const star = require("../assets/icons/star.png");
const transaction = require("../assets/icons/transaction.png");
const target = require("../assets/icons/target.png");
const world = require("../assets/icons/world.png");
const pdf = require("../assets/icons/pdf.png");
const facebook = require("../assets/icons/facebook.png");
const twitter = require("../assets/icons/twitter.png");
const tiktok = require("../assets/icons/tik-tok.png");
const youtube = require("../assets/icons/youtube.png");
const linkedin = require("../assets/icons/linkedin.png");
const reddit = require("../assets/icons/reddit.png");
const instagram = require("../assets/icons/instagram.png");

const man_outline = require("../assets/icons/man_outline.png");
const man = require("../assets/icons/man.png");
const user = require("../assets/icons/user.png");
const add_location_point = require("../assets/icons/add-location-point.png");
const map = require("../assets/icons/map.png");

const question = require("../assets/icons/question.png");
const exit = require("../assets/icons/exit.png");
const clock = require("../assets/icons/clock.png");
const location_pin = require("../assets/icons/location-pin.png");

const iconMap = {
    clock,
    location_pin,
    back_arrow,
    home,
    line_graph,
    notification_color,
    notification_white,
    pie_chart,
    right_arrow,
    settings,
    star,
    transaction,
    book,
    target,
    world,
    pdf,
    facebook,
    twitter,
    youtube,
    tiktok,
    linkedin,
    reddit,
    instagram,
    man_outline,
    man,
    user,
    add_location_point,
    map,
    question,
    exit
}


export const getIconByString = (iconName:string):ImageSourcePropType =>{
    const icon =  new Map(Object.entries(iconMap)).get(iconName) as ImageSourcePropType;
    return icon
     
}

export default iconMap