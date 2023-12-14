import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from './user/users.pb';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
  {
      transport: Transport.GRPC,
      options: {
        url:"0.0.0.0:50051",
        package: protobufPackage,
        protoPath: join('node_modules/microservicios/proto/users.proto')
      }
  }
  );
  await app.listen();
}
bootstrap();
