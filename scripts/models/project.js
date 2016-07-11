/**
 * Created by AGjozev on 5/24/2016.
 */

/* creating new project */

function Folder(folderName) {
    var me = {};
    var id = (new Date()).getTime();
    var name = folderName;
    var position = localStorage.length + 1;
    me.todos = [];

    me.getId = function () {
        return id;
    };

    me.getName = function () {
        return name;
    };

    me.getTasks = function () {
        return me.todos;
    };

    me.addTask = function (newTask) {
        me.todos.push(newTask);
    };

    me.removeTask = function (taskId) {

    };
    me.getClass = function () {
        return me.data.active;
    };

    me.getPosition = function () {
        return position;
    };


    me.data = {
        name: name,
        id: id,
        active: true,
        position: position
    };

    return me;
}