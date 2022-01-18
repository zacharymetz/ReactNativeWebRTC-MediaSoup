
// no completetion requirments means that badge 
// cannot be gotten by regulary doing missions
export interface badge {
    id: number;
    name: string;
    imageUrl: string;
    completetionRequirments?:CompletetionRequirments;
}

/*
    you can get a badge by either 
    1. completing n missions total
    2. completing n missions in a time frame 
    3. completing n missions on a platform 
    4. completing n missions on a in a time frame 
    5. getting a number of points total 
    6. getting a number of points in a time frame 
    7. None ( only some other mechanism can give this to someone)
*/
export interface CompletetionRequirments{

}