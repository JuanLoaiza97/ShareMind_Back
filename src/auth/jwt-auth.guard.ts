// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Este guard usa la estrategia 'jwt' definida en jwt.strategy.ts
 * para proteger las rutas que requieran autenticación.
 * 
 * Cuando se usa en un controlador o endpoint con @UseGuards(JwtAuthGuard),
 * NestJS validará automáticamente el token enviado en el header:
 * Authorization: Bearer <token>
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
