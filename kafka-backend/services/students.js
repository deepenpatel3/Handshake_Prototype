const Students = require("../Models/studentModel");
const Messages = require('../Models/messageModel');

exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend company_jobs_events service');
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "student_get_students":
            student_get_students(msg, callback);
            break;
        case "student_get_messages":
            student_get_messages(msg, callback);
            break;
        case "student_post_message":
            student_post_message(msg, callback);
            break;
        case "student_get_chats":
            student_get_chats(msg, callback);
            break;

    }
}

function student_get_students(msg, callback) {
    let pageNO = msg.body.pageNO;

    Students.find({ $and: [{ _id: { $ne: msg.body.ID } }, { $or: [{ name: { $regex: '.*' + msg.body.nameOrSchool + '.*' } }, { school: { $regex: '.*' + msg.body.nameOrSchool + '.*' } }] }] }).limit(4).skip((pageNO - 1) * 4).exec((err, students) => {
        if (err) {
            console.log('error', err)
            callback(null, false);
        } else {
            callback(null, students)
        }
    })
}

function student_get_messages(msg, callback) {

    Messages.findOne({ users: { $all: [msg.body.user1, msg.body.user2] } }).sort("messages.timeStamp").exec((err, chat) => {
        if (err) {
            console.log('error', err)
            callback(null, false);
        } if (chat) {
            // console.log("chat--", chat);
            callback(null, chat.messages);
        }
        // else {
        //     callback(null, students)
        // }
    })
}

function student_post_message(msg, callback) {

    Messages.findOne({ users: { $all: [msg.body.user1, msg.body.user2] } }, async (err, chat) => {
        if (err) {
            console.log('error', err)
            callback(null, false);
        }
        if (chat) {
            console.log(("chat exist"));
            await chat.messages.push({ message: msg.body.message, sender: msg.body.sender })
            await chat.save();
            callback(null, { success: true });
        } else {
            console.log("first message");
            var newMsg = await new Messages({
                users: [msg.body.user1, msg.body.user2],
                names: [msg.body.sender, msg.body.receiver],
                messages: [{
                    message: msg.body.message,
                    sender: msg.body.sender
                }]
            })
            await newMsg.save();
            callback(null, { success: true });
        }
    })
}

function student_get_chats(msg, callback) {

    Messages.find({ users: { $in: msg.body.ID } }, (err, chats) => {
        if (err) {
            console.log('error', err)
            callback(null, false);
        } if (chats) {
            console.log("chats--", chats);
            callback(null, chats);
        }
        // else {
        //     callback(null, students)
        // }
    })
}