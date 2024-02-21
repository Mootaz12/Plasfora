import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { connect } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
const run = async () => {
  await connect('mongodb://127.0.0.1:27017/plasfora');
  console.log('Connected to plasfora');
};

run().catch((err) => console.error(err));
bootstrap();
