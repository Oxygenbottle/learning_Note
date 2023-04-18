@Controller('./bookController.js')
export default class BookController {
  @RequestMapping(RequestMethod.GET, '/all')
  async getAllBooks(ctx) {
    ctx.body = {
      data: ['JS 一天精通', 'css从入门到放弃']
    }
  }
}