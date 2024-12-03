import { Schema, model, models, Model, Document } from "mongoose";
import { IUser } from "@/lib/definations";

// Define the TypeScript interface for a User

// Create the User schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    ContactNumber: { type: String, required: false },
    Address: { type: String, required: false },
    Password: { type: String, required: false },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

// Export the model, ensuring it doesn't get redefined in development
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);
export default User;
