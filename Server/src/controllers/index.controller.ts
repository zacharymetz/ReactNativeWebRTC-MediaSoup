import { Controller, Get } from 'routing-controllers';

@Controller()
export class IndexController {
  // this is a health check ping to see if the 
  // server is avalible ( public its for connection, private it is for the app instance )
  @Get('/api/v0/healthcheck')
  async healthCheck() {
    return 'Heart is still beating';
  }
}
