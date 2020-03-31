// CLI --> /Users/raimonlpez/mongodb/bin/mongod --dbpath=/Users/raimonlpez/mongodb-data
// CRUD - CREATE READ UPDATE DELETE ::

// insertOne, insertMany
// findOne, find
// updateOne, updateMany
// deleteOne, deleteMany

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database...");
  }
  const db = client.db(databaseName);

  
  db.collection("users").findOne({ age: 22 }, (error, user) => {
    if (error) {
      return console.log("Unable to fetch...");
    }
    if (user == null) {
      return console.log("user not found");
    }
    console.log(user);
  });

  // find by ID:

  
  db.collection("users").findOne(
    { _id: new ObjectID("5e820ce3f12c12062b6d5752") },
    (error, user) => {
      if (error) {
        return console.log("Unable to fetch data...");
      }
      console.log(user);
    }
  );

  // find by age --> returns a cursor:

  db.collection("users")
    .find({ age: 22 })
    .toArray((error, users) => {
      console.log(users);
    });

  db.collection("users")
    .find({ age: 22 })
    .count((error, usersCount) => {
      console.log(usersCount);
    });

  db.collection("tasks").findOne(
    { _id: new ObjectID("5e821de3a57503066d80c9cc") },
    (error, task) => {
      if (error) {
        return console.log("Unable to fetch data...");
      }
      console.log(task);
    }
  );

  db.collection("tasks")
    .find({ completed: false })
    .toArray((error, task) => {
      if (error) {
        return console.log("Unable to fetch data...");
      }
      console.log(task);
    });

  db.collection("users").updateOne({ _id: new ObjectID("5e81eac2ad7d4605e592d80b") }, {
    $set: {
      name: "Pedro"
    },
    $inc: {
      age: 15
    }
  }).then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  });

  db.collection("tasks").updateMany({ completed: true }, {
    $set: {
      completed: false
    }
  }
  ).then(result => {
    console.log(result.modifiedCount);
  }).catch(e => {
    console.log(e);
  });

  db.collection("users").deleteMany({ age: 22 })
    .then(result => {
      console.log(result.deletedCount);
    }).catch(e => {
      console.log(e);
    });


  db.collection("tasks").deleteOne({ description: "Buy flows in the street" })
    .then(result => {
      console.log(result.deletedCount);
    }).catch(e => {
      console.log(e);
    })
}
);
