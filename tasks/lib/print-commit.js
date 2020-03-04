
var debug = require('debug')('changelog:printSection');
var format = require('util').format;
var _ = require('lodash');

function printCommit(commit, printCommitLinks, template) {
  
  const commitLink = format('%s\n  (%s', commit.subject, this.linkToCommit(commit.hash))
  const closes = commit.closes.length ? commit.closes.map(this.linkToIssue, this).join(', ') : ''
  
  if (!template) {
    var result = '';
    if (printCommitLinks) {
      result += commitLink;
  
      if (closes) {
       result += ',\n   ' +  closes;
      }
      result += ')\n';
    } else {
      result += format('%s\n', commit.subject);
    }
  
    return result;
  } else {
    try{  
      var fn = _.template(template, {commit, closes, link: this.linkToCommit(commit.hash)});
      var tpl =  fn(data);
      return tpl;
    }catch(e){
      this.log('error', 'Invalid commit template file', e);
      throw 'Invalid commit template file \n' + e;
    }
  }

} 

module.exports = printCommit;