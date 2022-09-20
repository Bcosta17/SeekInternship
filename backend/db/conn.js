import mongoose from "mongoose";

async function main(){
    await mongoose.connect("mongodb://localhost:27017/seekinternship");
    console.log("Conectou ao Mongoose");
}

main().catch((err) => console.log(err));

export default mongoose;