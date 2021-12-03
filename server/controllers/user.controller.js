exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");

  res.status(200).send(JSON.stringify(req.headers["x-access-token"]));
  console.log(JSON.stringify(req.headers));
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
