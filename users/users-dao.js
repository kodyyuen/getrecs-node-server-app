import usersModel from "./users-model.js";

export const createUser = async (user) =>
  await usersModel.create(user)

export const findUserByUsername = async (username) =>
  await usersModel.findOne({ username })

export const findUserById = async (uid) =>
  await usersModel.findById(uid, { password: false })

export const findUserByCredentials = async (username, password) =>
  await usersModel.findOne({ username, password })

export const findAllUsers = async () =>
  await usersModel.find()

export const findUsersByLikedSong = async (songID) =>
  await usersModel.find({ likes: songID }, { 
    password: false, 
    likes: false 
  })

export const deleteUser = async (uid) =>
  await usersModel.deleteOne({ _id: uid })

export const updateUser = async (uid, userUpdates) =>
  await usersModel.findByIdAndUpdate({ _id: uid }, { $set: userUpdates }, {new: true})

export const appendToUserField = async (uid, updates) => 
  await usersModel.findByIdAndUpdate({ _id: uid }, {
    $push: updates
  }, {new: true})

export const removeRec = async (uid, timeStamp) => {
  const currentRecs = await usersModel.findById(uid);
  const newRecs = currentRecs.recommendations.filter(rec => rec.timeStamp !== timeStamp);
  const updatedUser = await usersModel.findByIdAndUpdate(
    { _id: uid }, 
    { $set: { recommendations: newRecs } }, 
    {new: true}
  );
  return updatedUser;
}