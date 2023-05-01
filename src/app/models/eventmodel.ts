import { room } from "./roommodel";
import { usermodel } from "./usermodel";

export interface eventmodel{
    _id:string,
    event_name:string,
    start_time:Date,
    end_time:Date,
    host:usermodel,
    room:room,
    status:string,
    invitees:usermodel[],
    title:string,
    id:string,
    end:string,
    start:string
}