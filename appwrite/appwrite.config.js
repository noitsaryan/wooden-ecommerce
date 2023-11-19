import { Client, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("655a4b69e862c5b15067");

export const storage = new Storage(client)