import { Server } from "http";
import mongoose from "mongoose";

export const openConnection = async () => {
  try {
    await mongoose.connect(process.env.NODE_MONGO_DB_URL);
  } catch (error) {
    console.log("Could not connect to database");
    process.exit(1);
  }
};

export const closeConnection = (server: Server) => {
  process.on("SIGINT", async () => {
    server.close(async () => {
      await mongoose.disconnect();
      console.log("Mongoose connection closed");
      process.exit(0);
    });
    await mongoose.disconnect();
    process.exit(0);
  });
};
