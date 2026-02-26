import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Đây chính là object { userId, email } ta đã return trong jwt.strategy.ts
    return request.user; 
  },
);