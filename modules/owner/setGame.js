/**
 * @file setGame command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const string = require('../../handlers/languageHandler');

exports.run = async (Bastion, message, args) => {
  if (!Bastion.credentials.ownerId.includes(message.author.id)) {
    /**
     * User has missing permissions.
     * @fires userMissingPermissions
     */
    return Bastion.emit('userMissingPermissions', this.help.userPermission);
  }

  try {
    if (args.length >= 1) {
      await Bastion.user.setPresence({
        game: {
          name: args.join(' '),
          type: 0
        }
      });

      message.channel.send({
        embed: {
          color: Bastion.colors.GREEN,
          description: `${Bastion.user.username}'s game is now set to **${args.join(' ')}**`
        }
      }).catch(e => {
        Bastion.log.error(e);
      });
    }
    else {
      await Bastion.user.setPresence({
        game: {
          name: Bastion.config.game,
          type: 0
        }
      });

      message.channel.send({
        embed: {
          color: Bastion.colors.GREEN,
          description: `${Bastion.user.username}'s game is now set to the default game **${Bastion.config.game}**`
        }
      }).catch(e => {
        Bastion.log.error(e);
      });
    }
  }
  catch (e) {
    Bastion.log.error(e);
  }
};

exports.config = {
  aliases: [ 'setg' ],
  enabled: true
};

exports.help = {
  name: 'setgame',
  description: string('setGame', 'commandDescription'),
  botPermission: '',
  userPermission: 'BOT_OWNER',
  usage: 'setGame [text]',
  example: [ 'setGame with minions!', 'setGame' ]
};
