/**
 * Copyright (c) TUT Tampere University of Technology 2015-2016
 * All rights reserved.
 *
 * Main author(s):
 * Farshad Ahmadi Ghohandizi <farshad.ahmadi.gh@gmail.com>
 */

module.exports = function(deviceManagerUrl, deviceInfo) {
  

  var request = require("request");
  var mqtt = require('mqtt');

  module.addAppInfo = function(appDescr, callback) {

      var tempClient  = mqtt.connect('mqtt://130.230.142.101:1883');
      tempClient.on('connect', function () {

          tempClient.publish('device/' + deviceInfo.idFromDM + '/apps/' + appDescr.id, JSON.stringify(appDescr));
      });

      /* //commented out because of mqtt testing
      var url = deviceManagerUrl + deviceInfo.idFromDM + "/apps";
      console.log("This is the device manager url: " + url);
      var options = {
          uri: url,
          method: 'POST',
          json: appDescr
      };

      request(options, function(err, res, body){
          if(err) {
              callback(err);
          } else if(res.statusCode == 200){
              console.log(body + " : " + typeof(body));
              callback(null, body);
              //callback(null, JSON.parse(body).status);
          } else {
              callback(new Error(body));
          }
      });*/
  };

  module.removeAppInfo = function(appDescr, callback){
      var aid = appDescr.id;
      var url = deviceManagerUrl + deviceInfo.idFromDM + "/apps/" + aid;
      console.log("This is the url" + url);
      var options = {
          uri: url,
          method: 'DELETE'
      };

      request(options, function(err, res, body){
          if(err) {
              callback(err);
          } else if(res.statusCode == 200){
              //console.log(body + " : " + typeof(body));
              callback(null, body);
              //callback(null, JSON.parse(body).status);
          } else {
              callback(new Error(body));
          }
      });
  }
  
  module.updateAppInfo = function(appDescr, callback){

      var tempClient  = mqtt.connect('mqtt://130.230.142.101:1883');
      tempClient.on('connect', function () {

          tempClient.publish('device/' + deviceInfo.idFromDM + '/apps/' + appDescr.id, JSON.stringify(appDescr));
      });

/*
      var aid = appDescr.id;
      var url = deviceManagerUrl + deviceInfo.idFromDM + "/apps/" + aid;
      console.log("This is the url: " + url);
      var options = {
          uri: url,
          method: 'PUT',
          json: appDescr
      };

      request(options, function(err, res, body){
          if(err) {
              callback(err);
          } else if(res.statusCode == 200){
              //console.log(body + " : " + typeof(body));
              callback(null, body);
          } else {
              callback(new Error(body));
          }
      });*/
  }

  return module;
}