import { Controller, Get } from 'routing-controllers';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

@Controller()
export class IndexController {
  // this is a health check ping to see if the 
  // server is avalible
  @Get('/api/v0/healthcheck')
  async healthCheck() {
    await delay(2000)
    return 'Health Check Passed';
  }
}
