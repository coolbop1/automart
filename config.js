var config = {
	production: {
        SECRET: process.env.SECRET
    },
    default: {
        SECRET: 'ourlittlesecret'
    }
}

exports.get = function get(env) {
    return config[env] || config.default
    console.log(config.default);
};
//config.jsmodule.exports = { 'secret': 'supersecret'};