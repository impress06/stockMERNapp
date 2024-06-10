const moment = require("moment");
const sendMail = require("../helper/sendMail");
const userModel = require("../models/user");

function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
let verificationCodes = {};

module.exports = {
  sendResetCode: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      

      if (user) {
        const code = generateRandomCode();
        const expiryTime = moment().add(15, "minutes");
        const expiryTimeFormatted = expiryTime.toISOString().split("T")[1].split(".")[0]; 

        verificationCodes[email] = { code, expiryTime: expiryTime.toISOString() };

        sendMail(
          user.email,
          "Reset Password",
          `Dear ${user.userName}, Your code is ${code} and it is valid for 15 minutes.`
        );

        return res.status(201).send({
          error: false,
          message: "Sending mail",
        });
      } else {
        return res.status(203).send({
          error: true,
          message: "Email not found",
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: "Server error",
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, code, newPassword } = req.body;
      const currentTime = moment().toISOString();
      const userCodeData = verificationCodes[email];

      if (!userCodeData || userCodeData.code !== code) {
        return res.status(400).send({ message: 'Invalid code or Code expired' });
      } else if (moment(currentTime).isAfter(userCodeData.expiryTime)) {
        delete verificationCodes[email];
        return res.status(400).json({ message: 'Code expired' });
      } else {
        await userModel.updateOne({ email: email }, { password: newPassword });
        delete verificationCodes[email]; // Kodu kullanıldıktan sonra sil
        return res.status(200).send({
          error: false,
          message: 'Password reset successful',
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: "Server error",
      });
    }
  },

};
