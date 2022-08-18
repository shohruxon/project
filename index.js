const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { create } = require("express-handlebars");
const uri =
  "mongodb+srv://shohrux:m9FvITRTn5OMx0wQ@cluster0.lgxuji3.mongodb.net/new-project";
const path = require("path");

const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: "./views/layouts",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
async function db() {
  try {
    await mongoose.connect(uri, (err) => {
      if (err) throw new Error(err);
      console.log("MongoDB connected", uri);
    });
  } catch (error) {
    console.error(error);
  }
}

db();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const RouterIndex = require("./routes/index");

// routing
app.use("/", RouterIndex);

const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

try {
  app.listen(port, () => {
    console.log("Server working on port", port);
  });
} catch (error) {
  console.error(error);
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
