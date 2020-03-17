const express = require('express');
const router = express.Router();
const copyrightYear = require('../modules/copyright_year');
const fetchMembers = require('../modules/fetch_members');

router.get('/', (req, res) => {

    fetchMembers()
        .then( members => {
            //console.log(done);

            res.render('members', {
                page: {members: true, name: 'Members'},
                copyrightYear,
                members,
                helpers: {
                    assign: function (varName, varValue, options) {
                        if (!options.data.root) {
                            options.data.root = {};
                        }
                        options.data.root[varName] = varValue;
                    },
                    colSize: function (param) {
                        return 12 / param.length;
                    },
                    isRowEmpty: function (param) {
                        return param.length === 0;
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(502);
    });
});

module.exports = router;