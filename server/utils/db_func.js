module.exports = db_functions = {
    async createUser(username, password) {
    return new User({
        username,   
        password, 
        created: Date.now()
    }).save()
    },
    deleteUser(username) {
        return User.remove({username})
    },
    findUser(username) {
      return await User.findOne({ username })
    }
}