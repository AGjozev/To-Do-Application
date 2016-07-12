/**
 * Created by AGjozev on 5/24/2016.
 */

/* creating new Task */

function Task(name, dueDate, folderId, position, photo) {
    var me = {};
    var id = (new Date()).getTime();
    me.dueDate = dueDate;
    me.isCompleted = false;

    if(plugIns.lat !== undefined && plugIns.lng !== undefined) {
        me.lat = plugIns.lat;
        me.lng = plugIns.lng;
    }else {
        me.lat = 41.9958009;
        me.lng = 21.4310132;
    }

    me.parentFolder = function () {
        return folderId;
    };


    me.getName = function () {
        return name;
    };

    me.markAsCompleted = function () {
        me.isCompleted = true;
    };

    me.markAsPending = function () {
        me.isCompleted = false;
    };

    me.getId = function () {
        return id;
    };

    me.getPosition = function () {
        return me.data.position;
    };

    me.getPhoto = function(){
        return me.data.photo;
    };

    me.setMap = function(map){
        me.data.map = map;
    };


    me.data = {
        name: name,
        folder: folderId,
        id: id,
        position: position,
        photo: photo,
        map:""
    };

    return me;


}