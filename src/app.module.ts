import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Conexión con MongoDB Atlas
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin1@cluster0.uj5kbpa.mongodb.net/sharemind?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule, // Importamos el módulo de usuarios
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
