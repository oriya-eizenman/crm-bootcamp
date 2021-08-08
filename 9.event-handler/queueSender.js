var redis = require("redis");
var publisher = redis.createClient();

publisher.publish("notification", "test", function () {
    process.exit(0);
});
return;