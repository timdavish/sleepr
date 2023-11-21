import { INestApplication } from '@nestjs/common';

export let app: INestApplication;

export const setApp = (_app: INestApplication) => {
  app = _app;
};
