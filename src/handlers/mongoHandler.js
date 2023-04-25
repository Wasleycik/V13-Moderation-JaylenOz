const mongoose = require("mongoose");
const conf = require("../configs/sunucuayar.json");

mongoose.connect(conf.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("✔️ [MONGO] Database bağlantısı tamamlandı!");
});
mongoose.connection.on("error", () => {
  console.error("❗️ [HATA] Database bağlantısı kurulamadı!");
});