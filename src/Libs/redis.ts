import redis from "redis";


const createReadisClient = (port:number,host:string,password:string) => redis.createClient({
  port: port, // replace with your port
  host:host, // replace with your hostanme or IP address
  password: password,
});

export default createReadisClient
