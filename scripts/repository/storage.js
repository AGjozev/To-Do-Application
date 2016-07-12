/**
 * Created by AGjozev on 5/18/2016.
 */

var storageData = (function () {

    var me = {};
    var $tasks = $('.tasks_wrapper');

    me.populateStorage = function (newProject) {
        var project = JSON.stringify(newProject);
        var id = newProject.getId();
        localStorage.setItem(id, project);
    };

    me.getProject = function (folderId) {
        var string = localStorage.getItem(folderId);
        var folder = JSON.parse(string);
        var project = me.rebuildProject(folder);
        return project;
    };
    /* getting projects from local storage and sending them to render */

    me.getAllProjects = function () {
        var projectsInStorage = [];
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var strIndex = key.indexOf('todoapp');
            if (strIndex >= 0) {
                var project = me.getProject(key);
                projectsInStorage.push(project);
            }
        }
        return projectsInStorage;
    };

    me.getActiveProject = function () {
        var projects = me.getAllProjects();
        for (var i = 0; i < projects.length; i++) {
            var id = projects[i].getId();
            var thisClass = projects[i].getClass();
            if (thisClass) {
                return id;
            }
        }
    };

    me.getAllTasksForCalendar = function () {
        var dates = [];
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var strIndex = key.indexOf('todoapp');
            if (strIndex >= 0) {
                var obj = localStorage.getItem(key);
                var folder = JSON.parse(obj);
                var project = storageData.rebuildProject(folder);
                var todo = project.getTasks();
                for (var j = 0; j < todo.length; j++) {
                    var day = todo[j].dueDate;
                    if (todo[j].isCompleted == false) {
                        dates.push(day);
                    }
                }
            }
        }
        return dates;
    };

    /* getting tasks from local storage and sending them to render */

    me.getAllTasksForProject = function (data_id) {
        var tasksInStorage = [];
        var folderId = data_id;
        var project = me.getProject(folderId);
        if (project.todos.length == 0)
            return tasksInStorage;
        for (var i = 0, len = project.todos.length; i < len; i++) {
            var todo = project.todos[i];
            var task = me.rebuildTask(todo);
            tasksInStorage.push(task);
        }
        return tasksInStorage;
    };

    /* getting tasks from search and sending them to render */

    me.getAllTasks = function () {
        $tasks.empty();
        var allTasksInStorage = [];
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var strIndex = key.indexOf('todoapp');
            if (strIndex >= 0) {
                var project = storageData.getProject(key);
                for (var j = 0, lent = project.todos.length; j < lent; j++) {
                    var todo = project.todos[j];
                    var task = me.rebuildTask(todo);
                    allTasksInStorage.push(task);
                }
            }
        }
        return allTasksInStorage;
    };

    /* rebuild methods in project */

    me.rebuildProject = function (project) {
        var me = project;

        me.getId = function () {
            return me.data.id;
        };

        me.getName = function () {
            return me.data.name;
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

        me.setClass = function (value) {
            me.data.active = value;
        };

        me.getPosition = function () {
            return me.data.position;
        };

        me.setPosition = function (value) {
            me.data.position = value;
        };

        return me;
    };

    /* rebuild methods in task */

    me.rebuildTask = function (task) {
        var me = task;

        me.setParentFolder = function (folderId) {
            me.data.folder = folderId;
        };

        me.parentFolder = function () {
            return me.data.folder;
        };


        me.getName = function () {
            return me.data.name;
        };

        me.markAsCompleted = function () {
            me.isCompleted = true;
        };

        me.markAsPending = function () {
            me.isCompleted = false;
        };

        me.getId = function () {
            return me.data.id;
        };

        me.getPosition = function () {
            return me.data.position;
        };

        me.setPosition = function (value) {
            me.data.position = value;
        };

        me.getPhoto = function () {
            return me.data.photo;
        };


        return me;
    };

    return me;
}());