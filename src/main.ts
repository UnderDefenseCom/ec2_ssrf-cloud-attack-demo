import express, {Express} from 'express';
import axios from "axios";

const app: Express = express()

app.get('/', function (request, response) {
    // const params = request.params
    let mime: string


    if (request.query['mime'] == 'plain') {
      mime = 'plain';
    } else {
      mime = 'html';
    }

    if (request.query['url']) {
      const url = request.query['url'] as string
      console.log(url)
      axios.get(url).then(_data => {
        response.writeHead(200, {'Content-Type': 'text/' + mime});
        // response.write('<pre >')
        response.write(JSON.stringify(_data.data, null, 2))
        // response.write('</pre>')
        response.end()
      }).catch(e=>{
        console.log(e)
        response.writeHead(200, {'Content-Type': 'text/' + mime});
        response.write(JSON.stringify(e))
        response.end()
      })
    } else {
      response.writeHead(200, {'Content-Type': 'text/' + mime});
      response.write('<h1>Welcome to SSRF demo.</h1>\n\n');
      response.write('<h2>Example: http://IP:PORT/?url=http://ifconfig.me</h2><br><br>');

      response.end();
    }
  }
)

app.listen(3000)
