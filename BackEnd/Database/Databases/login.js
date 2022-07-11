const Datastore = require("nedb");
require("dotenv").config();
const userDB = new Datastore({
  filename: process.env.USER_LOCATION,
  autoload: true,
});

const login = async (user, pass, socketID) => {
  let userDoc = await getUserInformation(user);
  // TODO: hash password(bcrypt)
  if (userDoc && userDoc.password === pass) {
    let setRequest = await setUserConnection(socketID, userDoc.user_ID);
    if (setRequest) {
      console.log(userDoc.logo)
      return { userID: userDoc.user_ID, logo: userDoc.logo, invoiceLogo: userDoc.invoiceLogo, statusCode: 200 };
    }
  }
  return { userID: false, statusCode: 400 };
};

const getUserInformation = (user) => {
  return new Promise((resolve, reject) => {
    userDB.findOne({ userName: user }, (err, doc) => {
      err ? reject(err) : resolve(doc);
    });
  });
};

const verifyUserConnection = (socketID, userID) => {
  const userIDFormatted = Number(userID);
  return new Promise((resolve, reject) => {
    userDB.find({ user_ID: userIDFormatted }, (err, doc) => {
      let verified = false;
      for (let i = 0; i < doc.length; i++) {
        if (doc[i] && doc[i].socket_ID === socketID) {
          verified = true;
          break;
        }
      }
      err ? reject(err) : resolve(verified);
    });
  });
};

const verifyUserConnectionAndReturnData = (socketID, userID) => {
  const userIDFormatted = Number(userID);
  return new Promise((resolve, reject) => {
    userDB.find({ user_ID: userIDFormatted }, (err, doc) => {
      let verifiedDoc = false
      for (let i = 0; i < doc.length; i++) {
        if (doc[i] && doc[i].socket_ID === socketID) {
          verifiedDoc = doc[i];
          break;
        }
      }
      // verifiedDoc = false
      err ? reject(err) : resolve({verifiedDoc});
    });
  });
};

const setUserConnection = (socketID, userId) => {
  const formattedUserId = Number(userId);
  const formattedSocketId = socketID;
  // console.log('setting socket id for:', socketID, userId)
  return new Promise((resolve, reject) => {
    userDB.update(
      { user_ID: formattedUserId },
      { $set: { socket_ID: formattedSocketId } },
      {},
      function (err, numReplaced) {
        err ? reject(400) : resolve(numReplaced > 0);
      }
    );
  });
};

exports.verifyUserConnection = verifyUserConnection;
exports.verifyUserConnectionAndReturnData = verifyUserConnectionAndReturnData;
// exports.setUserConnection = setUserConnection;
exports.login = login;
