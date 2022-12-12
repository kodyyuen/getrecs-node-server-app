import * as usersDao from "./users-dao.js";

const UsersController = (app) => {
  const findAllUsers = async (req, res) => {
    const users = usersDao.findAllUsers()
    res.json(users)
  }

  const findUserById = async (req, res) => {
    const uid = req.params.uid
    const user = await usersDao.findUserById(uid)
    if (user) {
      res.json(user)
      return
    }
    res.sendStatus(404)
  }

  const createUser = async (req, res) => {
    const newUser = req.body
    const actualUser = await usersDao.createUser(newUser)
    res.json(actualUser)
  }

  const register = async (req, res) => {
    const user = req.body;
    const existingUser = await usersDao.findUserByUsername(user.username)
    if (existingUser) {
      res.sendStatus(403)
      return
    }
    const currentUser = await usersDao.createUser(user)
    req.session['currentUser'] = currentUser
    res.json(currentUser)
  }

  const login = async (req, res) => {
    const credentials = req.body
    const existingUser = await usersDao.findUserByCredentials(credentials.username, credentials.password)
    if (existingUser) {
      req.session['currentUser'] = existingUser
      res.json(existingUser)
      return
    }
    res.sendStatus(403)
  }

  const logout = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }

  const profile = (req, res) => {
    if (req.session['currentUser']) {
      res.json(req.session['currentUser'])
    } else {
      res.sendStatus(403)
    }
  }

  const updateUser = async (req, res) => {
    const updates = req.body;
    if (req.session['currentUser']) {
        const uid = req.session['currentUser']._id;
        const update = await usersDao.updateUser(uid, updates);
        req.session['currentUser'] = update
        res.json(update);
        return;
    }
    res.sendStatus(403);
  }

  const getCurrentUser = async (req, res) => {
    if (req.session['currentUser']) {
        const uid = req.session['currentUser']._id;
        const update = await usersDao.updateUser(uid, updates);
        res.json(update);
        return;
    }
    res.sendStatus(403);
  }

  const findWhoRecentlyLiked = async (req, res) => {
    const songID = req.params.songID;
    const whoRecentlyLiked = await usersDao.findUsersByLikedSong(songID);
    res.json(whoRecentlyLiked);
  }

  app.get('/users', findAllUsers)
  app.get('/users/:uid', findUserById)
  app.post('/users', createUser)
  app.put('/users/update', updateUser)

  app.post('/register', register)
  app.post('/login', login)
  app.post('/logout', logout)
  app.post('/profile', profile)

  app.get('/recentlyLikedBy/:songID', findWhoRecentlyLiked)
}

export default UsersController;