import mongoose, { Connection, ConnectOptions } from "mongoose";

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI as string;

// Ensure the URI is defined
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Connection cache for development
let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    // Use cached connection if available
    return cached.conn;
  }

  if (!cached.promise) {
    // Only necessary options for Mongoose 6+
    const opts: ConnectOptions = {
      bufferCommands: false, // Disable command buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose.connection);
  }

  // Wait for the connection promise to resolve
  cached.conn = await cached.promise;
  return cached.conn;
}