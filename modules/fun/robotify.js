/**
 * @file robotify command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const string = require('../../handlers/languageHandler');
const request = require('request');

exports.run = (Bastion, message, args) => {
  let string;
  if (args.length < 1) {
    string = message.author.tag;
  }
  else {
    string = args.join(' ');
  }

  let url = `https://robohash.org/${encodeURIComponent(string)}`;
  request({ url: url, encoding: null }, function (err, res, body) {
    if (err) {
      /**
       * Error condition is encountered.
       * @fires error
       */
      return Bastion.emit('error', string('connection', 'errors'), string('connection', 'errorMessage'), message.channel);
    }

    message.channel.send({ files: [ { attachment: body } ] }).catch(e => {
      Bastion.log.error(e);
    });
  });
};

exports.config = {
  aliases: [ 'botify' ],
  enabled: true
};

exports.help = {
  name: 'robotify',
  description: string('robotify', 'commandDescription'),
  botPermission: '',
  userPermission: '',
  usage: 'robotify [Random String]',
  example: [ 'robotify', 'robotify isotope cattle hazily muzzle' ]
};
