const { User } = require("../../models");

const subscriptionUpdate = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    select: "email subscription",
  });

  res.json(result);
};

module.exports = subscriptionUpdate;
