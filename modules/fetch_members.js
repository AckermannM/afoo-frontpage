const fetch = require('node-fetch');
const createMember = require('../modules/create_member');


const fetchMembers = async () => {
    const response = await fetch('https://hub.afo-odin.com/admin/users/list/active.json?api_key=b8e6a824fe563d09ee59202fb1582e72635f455efa72a8d543713a0a1ccfa67b&api_username=system&order=id');
    const json = await response.json();

    let members = [
        {rows: [], isAdmin: true, badge: {color: 'danger', name: 'Administrator'}},
        {rows: [], badge: {color: 'special', name: 'Moderator'}},
        {rows: [], badge: {color: 'primary', name: 'Senior Member'}},
        {rows: [], badge: {color: 'success', name: 'Regular Member'}},
        {rows: [], badge: {color: 'secondary', name: 'Trial Member'}}
    ];

    // start at two to omit system accounts
    for (let i = 2; i < json.length; i++) {
        if (json[i] !== null) {
            let scope;
            switch (true) {
                case (json[i].admin): {
                    scope = members[0].rows;
                    if (scope.length === 0) {
                        scope.push([]);
                    }

                    if (scope[scope.length - 1].length < 3) {
                        scope[scope.length - 1].push(
                            await createMember(json[i].username, json[i].avatar_template)
                        );
                    } else {
                        scope.push([
                            await createMember(json[i].username, json[i].avatar_template)
                        ])
                    }
                    break;
                }
                case (json[i].moderator): {
                    scope = members[1].rows;
                    if (scope.length === 0) {
                        scope.push([]);
                    }

                    if (scope[scope.length - 1].length < 3) {
                        scope[scope.length - 1].push(
                            await createMember(json[i].username, json[i].avatar_template)
                        );
                    } else {
                        scope.push([
                            await createMember(json[i].username, json[i].avatar_template)
                        ])
                    }
                    break;
                }
                case (json[i].trust_level === 4): {
                    scope = members[2].rows;
                    if (scope.length === 0) {
                        scope.push([]);
                    }

                    if (scope[scope.length - 1].length < 3) {
                        scope[scope.length - 1].push(
                            await createMember(json[i].username, json[i].avatar_template)
                        );
                    } else {
                        scope.push([
                            await createMember(json[i].username, json[i].avatar_template)
                        ])
                    }
                    break;
                }
                case (json[i].trust_level === 3): {
                    scope = members[3].rows;
                    if (scope.length === 0) {
                        scope.push([]);
                    }

                    if (scope[scope.length - 1].length < 3) {
                        scope[scope.length - 1].push(
                            await createMember(json[i].username, json[i].avatar_template)
                        );
                    } else {
                        scope.push([
                            await createMember(json[i].username, json[i].avatar_template)
                        ])
                    }
                    break;
                }
                case (json[i].trust_level === 2): {
                    scope = members[4].rows;
                    if (scope.length === 0) {
                        scope.push([]);
                    }

                    if (scope[scope.length - 1].length < 3) {
                        scope[scope.length - 1].push(
                            await createMember(json[i].username, json[i].avatar_template)
                        );
                    } else {
                        scope.push([
                            await createMember(json[i].username, json[i].avatar_template)
                        ])
                    }
                    break;
                }
            }
        }
    }

    return members;

};


module.exports = fetchMembers;