import { Connection, ConnectOptions } from "mongoose";

declare global {
  var mongooseCache: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

// To ensure this file is treated as a module
export {};