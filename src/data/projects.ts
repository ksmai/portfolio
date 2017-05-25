/* tslint:disable max-line-length */
import { Project } from '../helpers/project';

const pinterest = require('../../assets/thumbnails/pinterest.png');
const bookTrading = require('../../assets/thumbnails/book-trading.png');
const captainMillion = require('../../assets/thumbnails/captain-million.png');
const impulse = require('../../assets/thumbnails/impulse.png');
const stock = require('../../assets/thumbnails/stock.png');
const nightlife = require('../../assets/thumbnails/nightlife.png');
const votingApp = require('../../assets/thumbnails/voting-app.png');
const spotify = require('../../assets/thumbnails/spotify.png');

export const projects: Project[] = [
  {
    name: 'Spotify clone',
    description: 'A simple music player application',
    technology: [
      'Angular 4',
      'Angular material',
    ],
    integrations: [
      'Spotify',
    ],
    github: 'https://github.com/ksmai/spotify-clone',
    url: 'https://ksmai.github.io/spotify-clone/',
    thumbnail: spotify,
  },
  {
    name: 'Pinterest clone',
    description: 'A simple image sharing application',
    technology: [
      'Angular 4',
      'express',
      'mongoDB',
    ],
    integrations: [
      'Twitter',
    ],
    github: 'https://github.com/ksmai/pinterest-clone',
    url: 'https://ksmai-pinterest.herokuapp.com/',
    thumbnail: pinterest,
  },
  {
    name: 'Book trading app',
    description: 'A platform for users to connect and trade books with one another',
    technology: [
      'Angular 4',
      'express',
      'mongoDB',
    ],
    integrations: [
      'Google Books',
    ],
    github: 'https://github.com/ksmai/trade-book',
    url: 'https://ksmai-book-trading.herokuapp.com/',
    thumbnail: bookTrading,
  },
  {
    name: 'Captain Million',
    description: 'An effective web-based warehouse management application',
    technology: [
      'express',
      'graphQL',
      'mongoDB',
      'react',
      'relay',
    ],
    collaborators: [
      {
        name: 'Vladimir Logachev',
        github: 'VladimirLogachev',
        url: 'http://vladimirlogachev.ru/',
        picture: 'https://avatars1.githubusercontent.com/u/17773003?v=3&s=460',
      },
      {
        name: 'Maxim',
        github: 'mkarabashev',
        picture: 'https://avatars3.githubusercontent.com/u/19782461?v=3&s=460',
      },
    ],
    github: 'https://github.com/Captain-Million/Captain-Million',
    url: 'https://dev-captain-million.herokuapp.com/',
    thumbnail: captainMillion,
  },
  {
    name: 'Impulse',
    description: 'A Chrome extension providing an inspiring new-tab page for boosting productivity',
    technology: [
      'react',
    ],
    integrations: [
      'Chrome',
    ],
    collaborators: [
      {
        name: 'Ethan Choi',
        github: 'ethanchoi812',
        url: 'http://www.iwebsg.com/',
        picture: 'https://avatars3.githubusercontent.com/u/18401697?v=3&s=460',
      },
      { name: 'Kamil',
        github: 'KamilCybulski',
        picture: 'https://avatars0.githubusercontent.com/u/21957453?v=3&s=460',
      },
      { name: 'Sam Williams',
        github: 'SamWCoding',
        picture: 'https://avatars0.githubusercontent.com/u/23235923?v=3&s=460',
      },
    ],
    github: 'https://github.com/ethanchoi812/momentum',
    url: 'https://chrome.google.com/webstore/detail/impulse/cfdlneaengomcfhaoofmobikhgcpmifc',
    thumbnail: impulse,
  },
  {
    name: 'Stock market',
    description: 'Chart the stock market based on a user-selected portfolio',
    technology: [
      'angularJS',
      'ws',
    ],
    integrations: [
      'Google Chart',
      'Yahoo',
    ],
    github: 'https://github.com/ksmai/watch-stock',
    url: 'https://ks-stock-watcher.herokuapp.com',
    thumbnail: stock,
  },
  {
    name: 'Nightlife',
    description: 'Coordinate nightlife activities by collecting choices from other users',
    technology: [
      'angularJS',
      'express',
      'mongoDB',
    ],
    integrations: [
      'Facebook',
      'Twitter',
      'Yelp',
    ],
    github: 'https://github.com/ksmai/nightlife',
    url: 'https://ksmai-nightlife.herokuapp.com',
    thumbnail: nightlife,
  },
  {
    name: 'Voting app',
    description: 'A web application for users to create polls, cast votes, view statistics and more',
    technology: [
      'angularJS',
      'express',
      'mongoDB',
    ],
    integrations: [
      'Facebook',
      'Twitter',
      'Github',
      'Google Chart',
    ],
    github: 'https://github.com/ksmai/voting-app',
    url: 'https://ks-voting-app.herokuapp.com/',
    thumbnail: votingApp,
  },
];
