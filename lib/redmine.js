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
  return {'X-Redmine-API-Key': this.getApiKey(), 'Content-Type': 'application/json'};
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
Redmine.prototype.getIssues = function(params, callback) {
  rest.get(this.getHost()+'/issues.json', {query: params, headers:this.getHeader()}).on('complete', callback);
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
Redmine.prototype.getTimeEntries = function(params, callback) {
  rest.get(this.getHost()+'/time_entries.json', {query: params, headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.getTimeEntry = function(id, callback) {
  if (typeof id == 'integer') {
    throw new Error('Error: Argument #1 id must be integer');
  }
  rest.get(this.getHost()+'/time_entries/' + id + '.json', {headers:this.getHeader()}).on('complete', callback);
};

Redmine.prototype.postTimeEntry = function(params, callback) {
  rest.postJson(this.getHost()+'/time_entries.json', {issue: params}, {headers:this.getHeader()}).on('complete', callback);
};


/*
 * Exports
 */
module.exports = Redmine;
