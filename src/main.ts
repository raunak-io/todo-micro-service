import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
const port = process.env.SERVER_PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: +port,
        retryAttempts: 3,
      },
    },
  );
  app.listen(() =>
    console.log(`====>Microservice  started at port ${port}<====`),
  );
}
bootstrap();
