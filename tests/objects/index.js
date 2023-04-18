const user_id = "1235";

const vehicle ={
    owner_id : "1234",
    make : "Toyota",
    model : "Hiace",
    drivers : [
        {
            driver_id : "1234",
            fingerprint_id : -1,
        },
        {
            driver_id : "1235",
            fingerprint_id : 12,
        }
    ]   
}



const { drivers } = vehicle;

delete vehicle.drivers;

drivers.map( driver => {
    if(driver.driver_id === user_id){
        vehicle.driver_id = driver.driver_id;
        vehicle.fingerprint_id = driver.fingerprint_id; 
    }
});


console.log(vehicle);