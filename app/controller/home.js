'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    const ctx = this.ctx;
    const config = ctx.app.config;
    // console.log('ctx.session', ctx.session);
    if (config.env === 'local') {
      console.log(1111);
      const tpl = (await ctx.curl(config.devStaticPath, {
        dataType: 'text'
      })).data;

      ctx.body = await ctx.renderString(tpl, { env: config.env });
    } else {
      await ctx.render('index.html', { env: config.env });
    }
  }

  async logout () {

  }
}

module.exports = HomeController;
