var Redmine = require('../lib/redmine');

var redmine = new Redmine({
  host: 'http://redmine.org',
  apiKey: 'redmine api key',
});


// get issue
redmine.getIssues({project_id: 1}, function(data) {
   if (data instanceof Error) {
    console.log("Error: "+data);
    return;
  }

  console.log("Issues:");
  console.log(data);
});


// create issue
var issue = {
  project_id: 1,
  subject: "This is new test issue on " + Date.now(),
  description: "Test issue description"
};
redmine.postIssue(issue, function(data) {
  if (data instanceof Error) {
    console.log("Error: " + data);
    return;
  }

  console.log(data);
});


// update issue
var issueId = 4; // exist id
var issueUpdate = {
  notes: "this is comment",
  subject: "New subject"
};
redmine.updateIssue(issueId, issueUpdate, function(data) {
  if (data instanceof Error) {
    //console.log("Error: " + data); FIXME
    return;
  }

  console.log(data);
});

// delte issue
var issueId = 4;
redmine.deleteIssue(issueId, function(data) {
  if (data instanceof Error) {
    console.log("Error: " + data);
    return;
  }

  console.log(data);
});

// get users
redmine.getUsers(function(data) {
   if (data instanceof Error) {
    console.log("Error: "+data);
    return;
  }
  console.log("Users:");
  console.log(data);
});

// create user
var user = {
  login: "jplang",
  firstname: "Jean-Philippe",
  lastname: "Lang",
  mail: "jp_lang@test.de",
};
redmine.postUser(user, function(data) {
  if (data instanceof Error) {
    console.log("Error: " + data);
    return;
  }
  console.log(data);
});

// update user
var userId = 93; // exist id
var userUpdate = {
  firstname: "Hans",
  lastname: "Dieter",
  mail: "hans.dieter@test.eu"
};
redmine.updateUser(userId, userUpdate, function(data) {
  if (data instanceof Error) {
    //console.log("Error: " + data); FIXME
    //return;
  }
  console.log("User Updated:");
  console.log(data);
});

//delte user
var userId = 93;
redmine.deleteUser(userId, function(data) {
  if (data instanceof Error) {
    //console.log("Error: " + data); FIXME
    //return;
  }
  console.log(data);
});

// get projects
redmine.getProjects(function(data) {
   if (data instanceof Error) {
    console.log("Error: "+data);
    return;
  }

  console.log("Projects:");
  console.log(data);
});