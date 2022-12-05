/* eslint-disable no-inner-declarations */
import Mongoose  from "mongoose";
try {
  async function run() {
    const set: string | undefined = process.env.MONGO_CONNECTION;
    if (set) Mongoose.connect(set);
  }
  run()
    .then(() => {
      console.log("connected sucessfully");
    })
    .catch(() => {
      console.log("first error");
    });
} catch (error) {
  console.log(error, "error found");
}

export default Mongoose;
