/**
 * Created by AGjozev on 5/20/2016.
 */


var render = (function () {
    var me = {};
    var $inputTaskName = $('#task_name_input');
    var $taskDaySelector = $('#day_selector');
    var $taskMonthSelector = $('#month_selector');
    var $projects = $('.projects');
    var $tasks = $('.tasks_wrapper');
    var $message = $("<h2 class='no_tasks'>This project is empty!</h2>");


    me.renderProjects = function () {
        $('.projects').empty();
        var projects = storageData.getAllProjects();
        if (!projects.length) {
            $(document).trigger('emptyStorage');
        } else {


            renderProjects(projects);
        }
    };

    me.renderTasks = function () {
        $tasks.empty();
        var projects = storageData.getAllProjects();
        if (!projects.length)
            return;

        var folderId = storageData.getActiveProject();
        if (folderId == undefined)
        return;
        var tasks = storageData.getAllTasksForProject(folderId);
        if (tasks.length == 0 && folderId) {
            $tasks.append($message);
        } else {
            if (!folderId) {
                return;
            } else {
                $message.remove();
                renderTasks(tasks);
            }
        }
    };

    me.all = function () {
        me.renderProjects();
        me.renderTasks();
    };

    me.renderTasksForSearch = function () {
        var projects = storageData.getAllProjects();
        if (!projects.length)
            return;
        var tasks = storageData.getAllTasks();
        renderTasks(tasks);

    };

    return me;

    function renderProjects(projects) {
        for (var i = 0; i < projects.length; i++) {
            var project = projects[i];
            var name = project.data.name;
            var data_id = project.getId();
            var tasksNumber = project.todos.length;
            var active = project.getClass();
            var position = project.getPosition();
            var $newProject = $("<li/>").addClass('projects_list').attr("data-id", data_id).attr("data-position", position);
            if (active) {
                $newProject.addClass('active');
                $('#all_tasks_title').text(name).css("color", "#6d7076");
            }
            var $bookIcon = $("<img src='assets/icons/Bookmark-52.png'/>").addClass('folder_icon');
            var $inputName = $('#add_list');
            var $projectName = $("<h3 class='projects_name'/>").text(name);
            var $projectNameEdit = $('<input type="text" class="projects_name_editor" placeholder=""/>').attr("data-id", data_id);
            var $counter = $("<p/>").addClass('counter').text(tasksNumber);
            var $deleteIcon = $("<img class='delete_icon' src='assets/icons/Trash-50.png'/>").attr("data-id", data_id);
            $newProject.append($bookIcon, $projectName, $projectNameEdit, $counter, $deleteIcon);
            $projects.append($newProject);
            $inputName.val('');

            var $projectSort = $(".projects_list");
            $projectSort.detach().sort(function (a, b) {
                return $(a).attr('data-position') - $(b).attr('data-position');

            });

            $projects.append($projectSort);
            plugIns.addDroppable();
        }
    }

    function renderTasks(tasks) {
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var task_name = task.getName();
            var taskId = task.getId();
            var dueDate = task.dueDate;
            var checked = task.isCompleted;
            var folderId = task.parentFolder();
            var photo = task.getPhoto();
            var position = task.getPosition();
            var lat = task.lat;
            var lng = task.lng;
            var today = $.datepicker.formatDate("mm dd", new Date());
            var myDate = $.datepicker.parseDate('M dd', dueDate);
            var parseDate = $.datepicker.formatDate('mm dd', myDate);
            var $taskContainer = $('<li class="task_container"/>').attr("data-id", taskId).attr("data-folderId", folderId).attr("data-position", position);
            var $checkboxConatiner = $('<div class="checkbox_holder"/>');
            var $checkBox;
            var $taskName = $('<h3 class="task_name"/>').text(task_name);
            var $taskNameEditor = $('<input class="edit_name_input" type="text" placeholder=""/>').attr("data-id", taskId).attr("data-folderId", folderId);
            var $taskDescription = $('<div class="task_description"/>').attr("data-id", taskId).attr("data-folderId", folderId);
            if (checked) {
                $checkBox = $('<img class="checkbox" src="assets/icons/Checked%20Checkbox%202-50.png"/>').addClass('checked').attr("data-id", taskId).attr("data-folderId", folderId);
                $taskName.addClass('done');
                $taskDescription.addClass('done');
                $taskName.removeClass('overdue');
                $taskDescription.removeClass('overdue');
            } else {
                $checkBox = $('<img class="checkbox" src="assets/icons/Unchecked%20Checkbox-50.png"/>').removeClass('checked').attr("data-id", taskId).attr("data-folderId", folderId);
                $taskName.removeClass('done');
                $taskDescription.removeClass('done');

                if (today > parseDate) {
                    $taskName.addClass('overdue');
                    $taskDescription.addClass('overdue');
                }
            }

            var $photoIcon = $('<img class="photo_icon" src="assets/icons/Compact%20Camera-52.png"/>').attr("data-image", photo).attr("data-id", taskId).attr("data-folderId", folderId);
            $taskDescription.append($photoIcon);

            var $mapIcon = $('<img class="map_icon" src="assets/icons/Marker-52.png"/>').attr("data-id", taskId).attr("data-folderId", folderId).attr('data-lat', lat).attr('data-lng', lng);
            $taskDescription.append($mapIcon);
            //  var $clockIcon = $('<img class="clock_icon" src="assets/icons/Watch-50.png"/>');
            var $timeStamp = $('<p class="time"/>').text(dueDate);
            var $deleteIcon = $('<img class="delete_icon_task" src="assets/icons/Trash-50.png"/>').attr("data-id", taskId).attr("data-folderId", folderId);
            $checkboxConatiner.append($checkBox);
            $taskDescription.append(/*$clockIcon,*/ $timeStamp, $deleteIcon);
            $taskContainer.append($checkboxConatiner, $taskName, $taskNameEditor, $taskDescription);
            $tasks.prepend($taskContainer);
            $inputTaskName.val('');
            $taskMonthSelector.val('Jan');
            $taskDaySelector.val('1');

            var $taskSort = $(".task_container").not("#input_task_container");
            $taskSort.detach().sort(function (a, b) {
                return $(b).attr('data-position') - $(a).attr('data-position');

            });

            $('.tasks_wrapper').append($taskSort);
        }
    }

}());

