import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserReadService } from '@/modules/user/service/user.read.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UserReadService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      try {
        req.currentUser = await this.usersService.getById(userId);
      } catch (e) {
        req.session.userId = null;
      }
    }

    next();
  }
}
