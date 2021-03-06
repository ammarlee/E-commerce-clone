const clody = require("../cloud");

exports.imgUploader = async (files) => {
    const uploader = async (path) => await clody.uploads(path);
    let urls = [];
    for (let file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
    }
    const images = urls.map((p) => {
      return p.url;
    });
    return images;
}