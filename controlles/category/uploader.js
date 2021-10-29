const clody = require("../cloud");
let imgUrl;

exports.uploadImg = async (newimg) => {
    const uploader = async (path) => await clody.uploads(path);
    let urls = [];
    const newpath = await uploader(newimg);
    urls.push(newpath);
    imgUrl = urls.map((p) => {
      return p.url;
    });
    return {
        img:imgUrl[0]
    }
    
}