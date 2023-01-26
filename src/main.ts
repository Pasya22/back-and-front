import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(process.env.PORT, () => {
    console.log("Listen on port " + port)
  });
}
bootstrap();
