const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);

module.exports = async () => {
  mongoose.set("useCreateIndex", true)

  await mongoose.connect(
    process.env.MONGO_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("🔌 Connected to MongoDB!")
  )
}
