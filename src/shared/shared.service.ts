import { AppException } from './../app.exception';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  processError(err: Error, context: string) {
    let code: HttpStatus, response;
    if (err instanceof AppException) {
      code = err.getCode();
      response = { code, message: err.getMessage() };
    } else {
      code = HttpStatus.INTERNAL_SERVER_ERROR;
      response = { code, message: 'Something went wrong' };
    }

    console.log('err', err);
    return { code, response };
  }
}
