/**
 * Created by AGjozev on 5/18/2016.
 */

/* Projects and Tasks manager */

var ProjectTaskManager = (function () {
    var me = {};
    me.activeId = 0;
    me.addNewProject = function (name) {
        var newProject = new Folder(name);
        storageData.populateStorage(newProject);
        //render.all();
        $(document).trigger('newProjectAdded');
    };

    me.editProject = function (folderId, newName) {
        var project = storageData.getProject(folderId);
        project.data.name = newName;
        storageData.populateStorage(project);
    };

    me.moveTaskToProject = function (oldFolderId, taskDataId, newFolderId) {
        if (oldFolderId == newFolderId)
            return;
        var project = storageData.getProject(oldFolderId);
        var taskHolder = {};
        for (var i = 0, len = project.todos.length; i < len; i++) {
            var todo = project.todos[i];
            var task = storageData.rebuildTask(todo);
            if (task.data.id == taskDataId) {
                task.setParentFolder(newFolderId);
                taskHolder = task;
                project.todos.splice(i, 1);
                break;
            }
        }
        storageData.populateStorage(project);
        var projectNew = storageData.getProject(newFolderId);
        projectNew.todos.push(taskHolder);
        storageData.populateStorage(projectNew);
        //  render.renderProjects();
        //   sendTasksToRender(oldFolderId);
        $(document).trigger('taskMovedToAnotherProject');
    };

    me.moveProject = function (folderId) {
        for (var i = 0; i < folderId.length; i++) {
            var id = folderId[i];
            var order = i + 1;
            var project = storageData.getProject(id);
            project.setPosition(order);
            storageData.populateStorage(project);
        }
    };

    me.moveTask = function (folderId, taskId) {
        var projectId = folderId[0];
        var project = storageData.getProject(projectId);
        for (var j = 0; j < taskId.length; j++) {
            var id = taskId[j];
            for (var i = 0; i < project.todos.length; i++) {
                var todo = project.todos[i];
                var task = storageData.rebuildTask(todo);
                var order = taskId.length - j;
                if (task.data.id == id)
                    task.setPosition(order);
            }
        }
        storageData.populateStorage(project);

    };

    /* Project delete*/
    me.deleteFromStorage = function (projectId) {
        localStorage.removeItem(projectId);
    };

    me.deleteTaskFromStorage = function (folderId, taskId) {
        var project = storageData.getProject(folderId);
        for (var i = 0; i < project.todos.length; i++) {
            var task = project.todos[i];
            if (task.data.id == taskId)
                project.todos.splice(i, 1);
        }
        storageData.populateStorage(project);
        //  render.renderProjects();
        $(document).trigger('taskDeletedFromStorage');
    };

    me.addNewTask = function (name, dueDate, imageCode) {
        var image = imageCode;
        var folderId = $('.active').data("id");
        var position = $('.tasks_wrapper').children().length + 1;
        var newTask = new Task(name, dueDate, folderId, position, image);
        var project = storageData.getProject(folderId);
        project.addTask(newTask);
        storageData.populateStorage(project);
        //  render.all();
        $(document).trigger('newTaskAdded');
    };

    me.editTaskLocation = function (taskId, folderId, lat, lng) {
        var project = storageData.getProject(folderId);
        for (var i = 0, len = project.todos.length; i < len; i++) {
            var todo = project.todos[i];
            var task = storageData.rebuildTask(todo);
            if (task.data.id == taskId) {
                task.lat = lat;
                task.lng = lng;
            }
        }
        storageData.populateStorage(project);
        //   sendTasksToRender(folderId);
    };

    me.editTaskPhoto = function (taskId, folderId, imageCode) {
        var image = imageCode;
        var project = storageData.getProject(folderId);
        for (var i = 0, len = project.todos.length; i < len; i++) {
            var todo = project.todos[i];
            var task = storageData.rebuildTask(todo);
            if (task.data.id == taskId) {
                task.data.photo = image;
            }
        }
        storageData.populateStorage(project);
    };

    me.editTaskName = function (name, taskId, folderId) {
        var project = storageData.getProject(folderId);
        for (var i = 0, len = project.todos.length; i < len; i++) {
            var todo = project.todos[i];
            var task = storageData.rebuildTask(todo);
            if (task.data.id == taskId) {
                task.data.name = name;
            }
        }
        storageData.populateStorage(project);
    };

    me.editTaskDate = function (taskId, dueDate, folderId) {
        var project = storageData.getProject(folderId);
        for (var i = 0, len = project.todos.length; i < len; i++) {
            var todo = project.todos[i];
            var task = storageData.rebuildTask(todo);
            if (task.data.id == taskId) {
                task.dueDate = dueDate;
            }
        }
        storageData.populateStorage(project);
        // sendTasksToRender(folderId);
    };

    me.checkTask = function (folderId, taskId) {
        var project = storageData.getProject(folderId);
        for (var i = 0, len = project.todos.length; i < len; i++) {
            var todo = project.todos[i];
            var task = storageData.rebuildTask(todo);
            var thisTaskId = task.data.id;
            if (thisTaskId == taskId) {
                task.markAsCompleted();
            }
        }
        storageData.populateStorage(project);
        calendar.editTaskDatesToCalendar();
    };

    me.uncheckTask = function (folderId, taskId) {
        var project = storageData.getProject(folderId);
        for (var i = 0, len = project.todos.length; i < len; i++) {
            var todo = project.todos[i];
            var task = storageData.rebuildTask(todo);
            if (task.data.id == taskId) {
                task.markAsPending();
            }
        }
        storageData.populateStorage(project);
        calendar.editTaskDatesToCalendar();
    };

    me.deactivateAll = function () {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var project = storageData.getProject(key);
            project.setClass(false);
            storageData.populateStorage(project);
        }
    };

    me.activeFolder = function (x) {
        if (localStorage.length == 0) {
            return;
        }
        var activeId = JSON.stringify(x.data('id'));
        me.deactivateAll();
        var thisProject = storageData.getProject(activeId);
        thisProject.setClass(true);
        storageData.populateStorage(thisProject);
        // render.all();
        $(document).trigger('newActiveProject');
    };

    me.searchTasks = function () {
        var tasks = [];
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var project = storageData.getProject(key);
            var todo = project.getTasks();
            for (var j = 0; j < todo.length; j++) {
                tasks.push(todo[j]);
            }
        }
        return tasks;
    };

    return me;



}());

