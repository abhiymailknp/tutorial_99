import { Schema,model } from "mongoose";

interface IUser extends Document{
    name :string;
    email: string;
    phoneNumber : string;
    country : string;
    password : string;
}

const UserSchema = new Schema<IUser>({
    name : {type: String,required:true},
    email : {type: String,required:true},
    phoneNumber : {type: String,required:true},
    country : {type: String,required:true},
    password : {type: String,minlength:8,maxlength:16,required:true}
})


export const UserModel = model<IUser>('User', UserSchema);