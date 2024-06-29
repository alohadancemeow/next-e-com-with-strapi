'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/healthcheck',
      handler: async (ctx, next) => {
        ctx.body = 'OK';
      },
      config: {
        auth: false
      }
    },
  ],
};
