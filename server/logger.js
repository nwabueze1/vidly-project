const log = (req, res, next) => {
  console.log("logging....");
  next();
};
module.exports = log;

//call backfaceVisibility:

getRepositories(Mosh);

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("getting repo" + username);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
