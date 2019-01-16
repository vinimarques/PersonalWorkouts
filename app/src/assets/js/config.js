var config = {};

config.projectName = 'PersonalWorkouts';
config.cacheTime = 24 * 60 * 60 * 1000;
config.debug = true;
config.version = "1.0.0";

config.api = {};

config.api.url = location.host.indexOf('localhost') >= 0 ? 'http://personal.v2rm.vm/api' : location.protocol + '//' + location.host + '/api';
config.key = 'p3R$0n@L';

config.pages = 'pages';
config.burnPerSecond = 0.08333;

module.exports = config;
