require("dotenv").config();

const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const port = process.argv[2] || process.env.PORT;

const mimeTypes = {
  html: "text/html",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  json: "application/json",
  js: "text/javascript",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  css: "text/css",
  glb: "model/gltf-binary",
  gltf: "model/gltf-binary",
};

const server = http.createServer(function (request, response) {
  let parsedUrl = url.parse(request.url);
  let resource = parsedUrl.pathname;
  let filename = path.join(process.cwd(), resource);

  try {
    let _f = fs.statSync(filename);
    if (_f.isDirectory()) filename += "/index.html";
  } catch (err) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("/// " + err.errno + "\n" + err);
    response.end();
    return;
  }

  fs.readFile(filename, "binary", function (err, file) {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write("/// " + err.errno + "\n" + err);
      response.end();
      return;
    }

    let mimeType = mimeTypes[filename.split(".").pop()];

    if (!mimeType) {
      mimeType = "text/plain";
    }

    response.writeHead(200, { "Content-Type": mimeType });
    response.write(file, "binary");
    response.end();
  });
});

// server.listen(8080, function () {
server.listen(parseInt(port, 10), function () {
  console.log("Server is running...");
});
