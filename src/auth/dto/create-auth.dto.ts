import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    description: 'Sign in username',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'Sign in password',
    example: 'password123',
  })
  password: string;
}
