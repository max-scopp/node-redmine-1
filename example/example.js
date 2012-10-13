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