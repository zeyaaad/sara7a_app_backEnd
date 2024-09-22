import { connect } from 'mongoose';


export const connection=()=> {
    connect(process.env.DB_URL).then(()=>{
        console.log("DB Connected")
    }).catch((err)=>{
        console.log(`err to connect to db : ${err}`)
    })
}
