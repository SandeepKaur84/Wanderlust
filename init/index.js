if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
  console.log("✅ Connected to DB for seeding:", dbUrl);
}


const initDB = async () => {
  await Listing.deleteMany({});
  console.log("🗑️ Old data deleted");

  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "68b736f9de128cfcaf1cf358",
  }));

const res = await Listing.insertMany(initdata.data);
console.log(`🌱 Data was initialized: Inserted ${res.length} documents`);

};

main()
  .then(initDB)
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error("❌ Error during seeding:", err);
    mongoose.connection.close();
  });
