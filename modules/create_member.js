const fetch = require('node-fetch');
const {getCode, getName} = require('country-list');

const createMember = async (name, avatar_template) => {
  let user = {};

  const lcName = name.toLowerCase();
  const avatarParsed = avatar_template.replace('{size}', '120');

  user.name = name;
  user.lowercase_name = lcName;
  user.avatar_template = avatarParsed;

  const response = await fetch('https://hub.afo-odin.com/users/' + lcName + '.json?api_key=b8e6a824fe563d09ee59202fb1582e72635f455efa72a8d543713a0a1ccfa67b&api_username=system');
  const json = await response.json();

  const country = json.user.user_fields[2];

  let iso;

  // brexit workaround 
  if (country === 'United Kingdom') {
    iso = 'gb'
  } else {
    iso = getCode(country).toLowerCase();
  }

  for (let i = 0; i < json.user_badges.length; i++) {
    if (json.user_badges[i].badge_id === 102) {
      user.founder = true;
    }
    if (json.user_badges[i].badge_id === 105) {
      user.backer = true;
    }
  }

  user.country = {
      iso,
      name: country
  };

  return user;
};

module.exports = createMember;