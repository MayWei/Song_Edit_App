const app = require('./server/server');
const hello='listening';
app.listen(4000, () => {
  console.log(hello);
});
