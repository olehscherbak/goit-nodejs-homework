const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  Jimp.read(tempUpload)
    .then((file) => {
      return file.resize(255, 255).quality(60).write(tempUpload);
    })
    .then(() => fs.rename(tempUpload, resultUpload))
    .catch((err) =>
      console.log(`jimp pakage error, can't resize avatar, ${err.message}`)
    );

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
