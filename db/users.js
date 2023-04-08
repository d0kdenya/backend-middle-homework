const records = [
  {
    id: 1,
    username: 'user',
    password: '123456',
    displayName: 'demo user',
    emails: [{ value: 'user@mail.ru' }]
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin123',
    displayName: 'ADMIN',
    emails: [{ value: 'admin@example.com' }]
  }
]

exports.findById = function (id, cb) {
  process.nextTick(function () {
    const idx = id - 1
    if (records[idx]) {
      cb(null, records[idx])
    } else {
      cb(new Error(`User ${ id } doesn\'t exist`))
    }
  })
}

exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    let i = 0, len = records.length
    for (; i < len; i++) {
      const record = records[i]
      if (record.username === username) {
        return cb(null, record)
      } else {
        cb(new Error(`${ username } doesn\'t exist`))
      }
    }
  })
}

exports.verifyPassword = (user, password) => {
  return user.password === password
}

exports.registerUser = (user) => {
  return records.push(user)
}

exports.getAllUsers = () => {
  return records.map(user => user)
}