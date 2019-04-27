var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src'));

app.get('/',function(request, response){
  response.sendFile(__dirname + '/index.html');
});
app.listen(5500, function(){// si el servidor se queda pegado podemos cambiar el 5500 por 4200 o reiniciar el pc
  console.log('Server Express Ready!');
});