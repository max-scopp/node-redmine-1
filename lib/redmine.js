var rest = require('restler');
var sys = require('util');

/**
 *  Redmine
 */
function Redmine(config) {
  if (!config.apiKey || !config.host) {
    throw new Error("Error: apiKey and host must be configured.");
  }

  this.setApiKey(config.apiKey);
  this.setHost(config.host);
}

Redmine.prototype.version = '0.2.4';

Redmine.prototype.setApiKey = function(key) {
  this.apiKey = key;
};

Redmine.prototype.getApiKey = function() {
  return this.apiKey;
};

Redmine.prototype.setHost = function(host) {
  this.host = host;
};

Redmine.prototype.getHeader = function() {
  return {'X-Redmine-API-Key': this.getApiKey(), 'Content-Type': 'application/json; charset=utf-8', };
};

Redmine.prototype.getHost = function() {
  return this.host;
};

/**
 *  crud apis
 */
Redmine.prototype.getIssue = function(id, callback) {
  if (typeof id == 'integer') {
    throw new Error('Error: Argument #1 id must be integer');
  }
  rest.get(this.getHost()+'/issues/' + id + '.json', {headers:this.getHeader()}).on('complete', callback);
};

/**
 * Issues http://www.redmine.org/projects/redmine/wiki/Rest_Issues
 */
Redmine.prototype.getIssues = function(query, callback) {
  rest.get(this.getHost()+'/issues.json', {query: query, headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.postIssue = function(params, callback) {
  rest.postJson(this.getHost()+'/issues.json', {issue: params}, {headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.updateIssue = function(id, params, callback) {
  rest.put(this.getHost()+'/issues/' + id + '.json', {data:JSON.stringify({issue: params}), headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.deleteIssue = function(id, callback) {
  rest.del(this.getHost()+'/issues/' + id + '.json', {headers:this.getHeader()}).on('complete', callback);
};


/**
 * Time Entries http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries
 */
// TESTME
Redmine.prototype.getTimeEntries = function(query, callback) {
  rest.get(this.getHost()+'/time_entries.json', {query: query, headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.getTimeEntry = function(id, callback) {
  if (typeof id == 'integer') {
    throw new Error('Error: Argument #1 id must be integer');
  }
  rest.get(this.getHost()+'/time_entries/' + id + '.json', {headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.postTimeEntry = function(params, callback) {
  rest.postJson(this.getHost()+'/time_entries.json', {time_entry: params}, {headers:this.getHeader()}).on('complete', callback);
};

/**
 * Users http://www.redmine.org/projects/redmine/wiki/Rest_Users
 */
Redmine.prototype.getUsers = function(callback) {
  rest.get(this.getHost()+'/users.json', {headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.postUser = function(params, callback) {
  rest.postJson(this.getHost()+'/users.json', {user: params}, {headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.updateUser   = function(id, params, callback) {
  rest.put(this.getHost()+'/users/' + id + '.json', {data:JSON.stringify({user: params}), headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.deleteUser = function(id, callback) {
  rest.del(this.getHost()+'/users/' + id + '.json', {headers:this.getHeader()}).on('complete', callback);
};

/**
 * Groups http://www.redmine.org/projects/redmine/wiki/Rest_Groups FIXME
 */

Redmine.prototype.getGroups = function(query, callback) {
  rest.get(this.getHost()+'/groups.json', {query:query, headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.getGroup = function(id, query, callback) {
  rest.get(this.getHost()+'/groups/' + id + '.json', {query:query, headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.postGroup = function(params, callback) {
  rest.postJson(this.getHost()+'/groups.json', {group: params}, {headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.updateGroup   = function(id, params, query, callback) {
  rest.put(this.getHost()+'/groups/' + id + '.json', {query:query, data:JSON.stringify({group: params}), headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.deleteGroup = function(id, query, callback) {
  rest.del(this.getHost()+'/groups/' + id + '.json', {query:query, headers:this.getHeader()}).on('complete', callback);
};

/**
 * Projects http://www.redmine.org/projects/redmine/wiki/Rest_Issues
 */
Redmine.prototype.getProjects = function(callback) {
  rest.get(this.getHost()+'/projects.json', {headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.getProject = function(id, query, callback) {
  rest.get(this.getHost()+'/projects/' + id + '.json', {query:query, headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.postProject = function(params, callback) {
  rest.postJson(this.getHost()+'/projects.json', {project: params}, {headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.updateProject = function(id, params, callback) {
  rest.put(this.getHost()+'/projects/' + id + '.json', {data:JSON.stringify({project: params}), headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.deleteProject = function(id, callback) {
  rest.del(this.getHost()+'/projects/' + id + '.json', {headers:this.getHeader()}).on('complete', callback);
};

/**
 * Roles http://www.redmine.org/projects/redmine/wiki/Rest_Roles FIXME Page not found
 */
Redmine.prototype.getRoles = function(callback) {
  rest.get(this.getHost()+'/roles.json', {headers:this.getHeader()}).on('complete', callback);
};

/**
 * Project Memberships http://www.redmine.org/projects/redmine/wiki/Rest_Memberships FIXME Page not found
 */
Redmine.prototype.postProjectMembership = function(project_id, params, callback) {
  rest.postJson(this.getHost()+'/projects/'+project_id+'/memberships.json', {membership: params}, {headers:this.getHeader()}).on('complete', callback);
};

/*
 * Exports
 */
module.exports = Redmine;
