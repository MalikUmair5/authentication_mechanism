"use server";

export async function handleOAuth({ provider }: { provider: string }) {
  await console.log("form filled", provider);
}
