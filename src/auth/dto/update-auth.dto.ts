import { PartialType } from '@nestjs/swagger';
import { SigninDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(SigninDto) {}
