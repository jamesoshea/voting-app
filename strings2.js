const https = require('https');
const secrets = require('./config');
const mongoose = require('mongoose');

mongoose.connect(secrets.dbUri, function(err){
  if(!err) console.log('Database connection good.');
});

var Author = require('./models/author');
var Channel = require('./models/channel');

//API key
var key = secrets.apiKey;

//get all news + politics channels
var channelsString =  'https://www.googleapis.com/youtube/v3/channels/?part=snippet,statistics&maxResults=5&categoryId=GCTmV3cyAmIFBvbGl0aWNz';
//get videos per channel
var channelUploads =  'https://www.googleapis.com/youtube/v3/channels/?part=contentDetails&maxResults=5&id=';
var videoStrings =     'https://www.googleapis.com/youtube/v3/playlistItems/?part=snippet&maxResults=5&playlistId=';
//get comment threads per video
var threadsString =   'https://www.googleapis.com/youtube/v3/commentThreads/?part=snippet,replies&maxResults=5&videoId=';
//get comments per thread
var commentsString =  'https://www.googleapis.com/youtube/v3/comments/?part=snippet&maxResults=100&parentId=';

//get channels
var channels =
