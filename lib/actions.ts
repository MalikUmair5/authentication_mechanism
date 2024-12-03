"use server";
import { formSchema, IUser, RegisterUserType } from "./definations";
import { signIn } from "@/auth";

export const handleSignupSubmit = async (formData: FormData) => {
  "use server";
  let name = formData.get("Name");
  let email = formData.get("Email");
  let contact = formData.get("contactNumber");
  let address = formData.get("Address");
  let password = formData.get("Password");
  let confirmPassword = formData.get("ConfirmPassword");
  const data = {
    Name: name,
    Email: email,
    ContactNumber: contact,
    Address: address,
    Password: password,
    ConfirmPassword: confirmPassword,
  };
  try {
    formSchema.parse(data);
  } catch (error: any) {
    //  console.log(error.errors)
    return error.errors;
  }
};

export const handleOAuthSubmit = async (formData: FormData) => {
  "use server";
  let provider = formData.get("provider");
  await signIn(`${provider}`, { redirectTo: "/" });
};

// export async function CreateUser({
//   name,
//   email,
//   ContactNumber,
//   Address,
//   Password
// }: RegisterUserType) {
//   const userData = {
//     name,
//     email,
//     ContactNumber,
//     Address,
//     Password,
//   };
//   const apiUrl = "http://localhost:3000/api/users/create"; // Update with the correct URL if deployed

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     // Parse and log the response
//     const result = await response.json();
//     console.log("API Response:", result);

//     if (response.ok) {
//       console.log("Test Passed: User created successfully!");
//     } else {
//       console.error("Test Failed:", result.error || "Unknown error");
//     }
//   } catch (error) {
//     console.error("Test Failed: Unable to connect to API", error);
//   }
// }


export async function CreateUser({
    name,
    email,
    ContactNumber,
    Address,
    Password,
  }: RegisterUserType): Promise<{ success: boolean; message: string }> {
    const userData = {
      name,
      email,
      ContactNumber,
      Address,
      Password,
    };
    const apiUrl = "http://localhost:3000/api/users/create"; // Update with the correct URL if deployed
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return { success: true, message: "User created successfully!" };
      } else {
        return {
          success: false,
          message: result.error || "Failed to create user due to an unknown error.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Unable to connect to the API. Please try again later.",
      };
    }
  }
  
