var Hapi = require(`@hapi/hapi`);
var server = Hapi.server({
    host:`localhost`,
    port: Number(process.argv[2] || 8080)
});

server.route({path: `/`, method:`GET`, handler: anonOrYourFunction});

function handler(request, h) {
    return `Hello ${request.params.name}`;
}

await server.start();
console.log(`Server running at: `, server.info.uri);

// Hello_HAPI
// ROUTES

var Inert = require(`@hapi/inert`);
await server.register(Inert);

// HANDLING dir
handler: {
    file:"index.html"
}


// DIRECTORY dir
handler: {
    directory: { path: `./path/to/somewhere/{param}` }
}

// VIEWS dir 
var Vision = require(`@hapi/vision`);

await server.register(Vision);

handler: {
    view: "index.html"
}
  // Handlebars dir 
  // To install handlebars: npm install handlebars
server.views({
    engines: {
        html: require(`handlebars`)
    },
    path: Path.join(__dirname, `templates`) 
});

// <div>{{query.paramName}}</div>

// HELPER dir
 var options = {
     view: {
         helpersPath: `helpers`
     }
 };

 module.exports = function(context) {
     return context.data.root.query.foo;
 }
  //  <div>{{helper}}</div>  

// VALIDATION dir 
// To install joi: npm install joi
var routeConfig = {
    path: `/a/path/{with}/{parameters}`,
    method: `GET`,
    handler: myHandler,
    config: {
        validate: {
            params: {
                with: Joi.string().required(),
                parameters: Joi.string().required()
            }
        }
    }
}

// VALIDATION USING JOI OBJECT dir

var routeConfig = {
    path: `/a/path/`,
    method: `POST`,
    handler: myHandler,
    config: {
        validate: {
            payload: Joi.object({
                username: Joi.string(),
                password: Joi.string().alphanum(),
                accessToken: Joi.string().alphanum(),
                birthyear: Joi.number().integer().min(1900).max(2013),
                email: Joi.string().email()
            })
            .options({allowUnknown: true})
            .with(`username`, `birthyear`)
            .without(`password`, `accessToken`)
        }
    }
}

// UPLOAD dir

{
    description : //form description
    file : {
        data :    //content 
        filename: //name of file
        headers : //hapi file header
    }
}


// for readable stream, add route configuration

payload: {
    output : `stream`,
    parse : true 
}

// then

handler: function (request, reply) {
    var body = ``;
    request.payload.file.on(`data`, function (data){
         body += data
    });

    request.payload.file.on(`end`, function (){

        console.log(body);
    });
}

// COOKIES dir

  config: {
      state: {
          parse: true,
          failAction: `log`
      }
  }

  // you will have various ways to handle cookies when using this option
  // hapi provides to handle cookies

  server.state(`session`, {
      path: `/`,
  });
  
  reply(`success`).state(`session`, `session`)

  // acces the cookies

   var session = request.state.session;

// AUTH dir
// npm install @hapi/basic

   server.auth.strategy(`simple`, `basic`, { validateFunc: validate});
   server.auth.default(`simple`);

   server.route({
       method: `GET`,
       path: `/`,
       handler: function (request, h) {

            return `welcome`;
       }
   });
   
