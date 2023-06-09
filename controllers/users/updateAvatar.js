const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");
// const { HttpError } = require("../../helpers");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
  const { path: tempUpload, originalname } = req.file;

  await Jimp.read(tempUpload)
    .then((file) => {
      return file.resize(255, 255).quality(60).write(tempUpload);
    })
    .catch((err) =>
      console.log(`jimp pakage error, can't resize avatar, ${err.message}`)
    );

  // await Jimp.read(tempUpload, (err, file) => {
  //   if (err) {
  //     console.log("jimp pakage error, can't resize avatar");
  //     HttpError(500, "jimp pakage error, can't resize avatar");
  //   }
  //   console.log("resizing...");
  //   file.resize(255, 255).quality(60).write(tempUpload);
  //   console.log("resized");
  // });

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
