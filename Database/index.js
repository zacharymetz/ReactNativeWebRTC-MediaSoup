


const main = async () =>{
    
    // connect to the local db on the machine 
    const dbClient = await createDBClient();
    // run a drop on all the tables 
    await dbClient.dropAllTables();    // run a quire to get all the tables 

    // loop though all the scheme scripts and apply them one by one 
        // logging the name 
        // error out if the next number is no sequential 
    await dbClient.createSchema();
    
    // loop though all the referenceScripts and do the same as the other one 
    await dbClient.insertReferenceData();
}


class PostgresDBClient{
    
    constructor(){

    }
    initConnection(){

    }
    dropAllTables(){

    }
    createSchema(){
        // load a list of all the files in the schemaScripts folder
    }
    insertReferenceData(){  
        // load a list of all the files in the referenceScripts folder
    }



}


const createDBClient = async () =>{
    const client = new PostgresDBClient();

    await client.initConnection();

    return client;

}

main();