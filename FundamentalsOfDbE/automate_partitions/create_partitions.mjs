import pgautomatepart from 'pg';
/*
This script creates 100 partitions 
and attaches them to the main table customers

Create a docker instance first, or use what you have running already

sudo docker run --name pgautomatepart -e POSTGRES_PASSWORD=postgres -p 5436:5432 -d postgres

To later connect to the docker instance use the following command
sudo docker exec -it pgautomatepart psql -U postgres -d customers

where pgautomatepart is the name of the docker instance
*/
async function run() {
    try {

 
    const dbClientPostgres = new pgautomatepart.Client({
        "user": "postgres",
        "password" : "postgres",
        "host" : "localhost",
        "port" : 5436,
        "database" : "postgres"
    })
    // create or drop customers db depending on what you want to do 
    console.log ("connecting to postgres...")
    await dbClientPostgres.connect();
    // console.log ("dropping database customers...")
    // await dbClientPostgres.query("drop database customers")
    console.log ("creating database customers...")
    await dbClientPostgres.query("create database customers")
 

    const dbClientCustomers = new pgautomatepart.Client({
        "user": "postgres",
        "password" : "postgres",
        "host" : "localhost",
        "port" : 5436,
        "database" : "customers"
    })

    console.log ("connecting to customers db...")
    await dbClientCustomers.connect();
    console.log("creating customers table...")
    const sql = `create table customers (id serial, name text) 
                 partition by range (id)`
    await dbClientCustomers.query(sql)
    console.log("creating partitions... ")
    /*
    assume we are going to support 1B customers
    and each partition will have 10M customers 
    that gives 1000/10 -> 100 partition tables 
    */
   for (let i =0; i < 100; i ++)
    {   
        const idFrom = i*10000000;
        const idTo = (i+1)*10000000  ;
        const partitionName = `customers_${idFrom}_${idTo}`
        const psql1  = `create table ${partitionName}
                         (like customers including indexes)`;

        const psql2  = `alter table customers
            attach partition ${partitionName}
            for values from (${idFrom}) to (${idTo})
         `;

       console.log(`creating partition ${partitionName} `)
       await dbClientCustomers.query(psql1);
       await dbClientCustomers.query(psql2);
    }

    
    console.log("closing connection")
    await dbClientCustomers.end();
    await dbClientPostgres.end();
    console.log("done.")
    }
    catch (ex){
        console.error(`something went wrong ${JSON.stringify(ex)}`)
    }
}

 run();
