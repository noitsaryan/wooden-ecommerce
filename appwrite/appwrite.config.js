import { Client, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("654770da73a0985cfe74");

export const storage = new Storage(client)