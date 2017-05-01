import { Project } from '../helpers/project';

const pinterest = require('../../assets/thumbnails/pinterest.png');
const bookTrading = require('../../assets/thumbnails/book-trading.png');
const captainMillion = require('../../assets/thumbnails/captain-million.png');
const impulse = require('../../assets/thumbnails/impulse.png');
const stock = require('../../assets/thumbnails/stock.png');
const nightlife = require('../../assets/thumbnails/nightlife.png');
const votingApp = require('../../assets/thumbnails/voting-app.png');

export const projects: Project[] = [
  {
    name: 'Pinterest clone',
    description: 'A clone of Pinterest for sharing images with ease. Users can sign in with Twitter.',
    technology: [
      'Angular 4',
      'express',
      'mongoDB',
    ],
    github: 'https://github.com/ksmai/pinterest-clone',
    url: 'https://ksmai-pinterest.herokuapp.com/',
    thumbnail: pinterest,
  },
  {
    name: 'Book trading app',
    description: 'A platform for users to connect and trade with one another. Book data are obtained using Google Books API.',
    technology: [
      'Angular 4',
      'express',
      'mongoDB',
    ],
    github: 'https://github.com/ksmai/trade-book',
    url: 'https://ksmai-book-trading.herokuapp.com/',
    thumbnail: bookTrading,
  },
  {
    name: 'Captain Million',
    description: 'A simple but effective web-based warehouse management application.',
    technology: [
      'express',
      'graphQL',
      'mongoDB',
      'react',
      'relay',
    ],
    collaborators: [
      { name: 'Vladimir Logachev', github: 'VladimirLogachev' },
      { name: 'Maxim', github: 'mkarabashev' },
    ],
    github: 'https://github.com/Captain-Million/Captain-Million',
    url: 'https://dev-captain-million.herokuapp.com/',
    thumbnail: captainMillion,
  },
  {
    name: 'Impulse',
    description: 'A Chrome extension that provides an inspiring new-tab page aimming at improving productivity. Utilities include todo list, weather infomation, quote machine, etc. An iteration of Momentum.',
    technology: [
      'react',
    ],
    collaborators: [
      { name: 'Ethan Choi', github: 'ethanchoi812' },
      { name: 'Kamil', github: 'KamilCybulski' },
      { name: 'Sam Williams', github: 'SamWCoding' },
    ],
    github: 'https://github.com/ethanchoi812/momentum',
    url: 'https://chrome.google.com/webstore/category/extensions',
    thumbnail: impulse,
  },
  {
    name: 'Stock market',
    description: 'Chart the stock market based on a user-selected portfolio. Data are synchronized across clients using web sockets. Real-time stock quotes are provided by Yahoo.',
    technology: [
      'angularJS',
      'ws',
    ],
    github: 'https://github.com/ksmai/watch-stock',
    url: 'https://ks-stock-watcher.herokuapp.com',
    thumbnail: stock,
  },
  {
    name: 'Nightlife',
    description: 'Coordinate nightlife by letting users to indicate their choices of restaurants every night. Decisions can be easily made in advance based on the relative crowdiness of the places. Location-based restaurant search provided by Yelp API. Integrated with Facebook and Twitter.',
    technology: [
      'angularJS',
      'express',
      'mongoDB',
    ],
    github: 'https://github.com/ksmai/nightlife',
    url: 'https://ksmai-nightlife.herokuapp.com',
    thumbnail: nightlife,
  },
  {
    name: 'Voting app',
    description: 'A web application for users to create polls, cast votes, view statistics and more. Allow login from Facebook, Twitter and Github accounts. Data are visualized with Google Chart.',
    technology: [
      'angularJS',
      'express',
      'mongoDB',
    ],
    github: 'https://github.com/ksmai/voting-app',
    url: 'https://ks-voting-app.herokuapp.com/',
    thumbnail: votingApp,
  },
];
