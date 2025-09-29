import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDevelop(): string {
    return 'Desarrollado por: Juan Mozo, Juan Poveda, Johan Lopez y Julian Sanchez';
  }
}
