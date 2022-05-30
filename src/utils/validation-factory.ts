import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export function ValidationPipeFactory(options: Partial<ValidationPipeOptions> = {}) {
    return new ValidationPipe({
        transform: true,
        skipMissingProperties: false,
        ...options
    })
}
