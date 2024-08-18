import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

let server: Server;

async function main() {
  try {
    const mongooseConnection = await mongoose.connect(
      config.database_url as string,
    );

    if (mongooseConnection) console.log('Database connection established');

    server = app.listen(config.port, () => {
      console.log(`Athletix server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
