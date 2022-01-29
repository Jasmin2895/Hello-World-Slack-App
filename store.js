let messages = {};
let users = {};
let me = undefined;
let defaultChannel = undefined;


exports.getMessages = ()=> {
    return messages;
}

exports.addUser = (user) => {
    users[user.user] = user;
}

exports.getUser = (id)=> {
    return users[id];
}

exports.getChannel = () => {
    return defaultChannel;
}

exports.setChannel = (channel) => {
    defaultChannel = channel;
}

exports.setMe = (id) => {
    me = id;
}

exports.getMe = () => {
    return me;
}