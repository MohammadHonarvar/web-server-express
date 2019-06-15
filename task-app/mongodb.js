// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const connectToMongo = new Promise((resolve, reject) => {
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      reject('Unable to connect to database!')
    }
    resolve(client)
  })
})

const findAllUncompletedTasks = (db) => {
  return db.collection('tasks').find({ completed: false }).toArray()
}

const updateOneUser = (db, name) => {
  return db.collection('users').updateOne({ _id: new ObjectID("5d02abaa11e64f2a80f4774c") }, {
    $set: {
      name
    }
  })
}

const updateAllTasks = db => {
  return db.collection('tasks').updateMany({ completed: false }, {
    $set: {
      completed: true
    }
  })
}

const deleteSomeUsers = (db, filter) => {
  return db.collection('users').deleteMany(filter)
}

const deleteOneTask = (db, filter) => {
  return db.collection('tasks').deleteOne(filter)
}

(async _ => {
  try {
    const client = await connectToMongo;
    const db = client.db(databaseName)

    // const data = await findAllUncompletedTasks(db)
    // const data = await updateOneUser(db, 'MHF0')
    // const data = await updateAllTasks(db)
    // const data = await deleteSomeUsers(db, { age: 28 })
    const data = await deleteOneTask(db, { description: 'Number three task' })
    console.log(JSON.parse(data))
  }
  catch(error) {
    console.error('Error on update')
  }
})()

// MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
//   if (error) {
//     return console.error('Unable to connect to database')
//   }

//   const db = client.db(databaseName)
//   // db.collection('users').insertMany([
//   //   {
//   //     name: 'MHF3',
//   //     age:29
//   //   }, {
//   //     name: 'MHF4',
//   //     age: 30
//   //   }
//   // ], (error, result) => {
//   //   if (error) {
//   //     return console.error('Unable to insert documnets')
//   //   }

//   //   console.log(result.ops)
//   // })

//   // db.collection('tasks').insertMany([
//   //   {
//   //     description: 'Number one task',
//   //     completed: false
//   //   }, {
//   //     description: 'Number two task',
//   //     completed: false
//   //   }, {
//   //     description: 'Number three task',
//   //     completed: true
//   //   },
//   // ], (error, result) => {
//   //   if (error) {
//   //     return console.error('Unable to insert tasks documents')
//   //   }

//   //   console.log(result.ops)
//   // })

//   // db.collection('users').findOne({ _id: new ObjectID("5d02a89b42c9621df0829550") }, (error, user) => {
//   //   if (error) {
//   //     return console.error('Unable to fetch')
//   //   }

//   //   console.log(user.name)
//   // })

//   // db.collection('users').find().count((error, count) => {
//   //   console.log(count)
//   // })

//   // db.collection('tasks').findOne({ _id: new ObjectID("5d036dfc242a0d1f4c4a59d6") }, (error, task) => {
//   //   console.log(task)
//   // })



//   // const getData = async _ => {
//   //   try {
//   //     const data = await findAllUncompletedTasks
//   //     console.log(data);
//   //   }
//   //   catch(error) {
//   //     console.error('An error happend')
//   //   }

//   // }

//   // getData()

//   // findAllUncompletedTasks.then(res => console.log(res)).catch(err => console.error(err))

//   // db.collection('tasks').find({ completed: false }).toArray((error, result) => {
//   //   console.log(result)
//   // })

// });
