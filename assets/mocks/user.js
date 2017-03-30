export function insertUser (mock) {
  mock.post('/user/create', function (req) {
    return {
      body: {
        status: 200,
        content: {
          ...req.body,
          uid: Math.random().toString()
        }
      }
    }
  })

  mock.post('/user/delete', function (req) {
    return {
      body: {
        status: 200,
        content: 'ok'
      }
    }
  })
}
