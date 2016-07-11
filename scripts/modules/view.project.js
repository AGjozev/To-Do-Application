/**
 * Created by AGjozev on 5/25/2016.
 */
function ProjectView() {
    var me = {};
    var $projects = $('.projects');
    var $tasks = $('.tasks_wrapper');
    var $addProjectButton = $('.plus_icon');
    var $projectInput = $('#add_list');
    var DELAY = 300,
        clicks = 0,
        timer = null;

    function removeEditor() {
        $('.projects_name_editor').css('display', 'none');
        $('.projects_name').css('display', 'inline');
    }

    function editProjectName(e) {
        removeEditor();
        var element = e;
        var text = element.text();
        var editor = element.next();
        e.css('display', 'none');
        editor.css('display', 'inline');
        editor.val(text);
        editor.focus();
    }

    function checkForActive() {
        var $projectsList = $('.projects_list');
        if ($projectsList.length == 0) {
            $(document).trigger('noProjects');
        } else {
            if ($projectsList.hasClass('active'))
                return;
            var firstProject = $projects.children(":first");
            ProjectTaskManager.activeFolder(firstProject);
        }
    }

    function attachEvents() {

        $(document).on("removeProjectEditor", function () {
            removeEditor();
        }); // remove project name editor on click away

        $(document).on('click', "#side_menu_collapsed", function () {
            $("#black_filter").css("display", "inline");
            $("#side_menu").animate({ width: 'toggle' }, 350);
            $("#body_container").animate({ left: '252px' }, 350);
        }); //slide in side menu for mobile

        $(document).on('click', "#back_arrow", function () {
            $("#black_filter").css("display", "none");
            $("#side_menu").animate({ width: 'toggle' }, 350);
            $("#body_container").animate({ left: '0' }, 350);
        });  //slide out side menu for mobile

        $(document).on('drop', ".projects_list", function (e, ui) {
            var drag = ui.draggable;
            var element = $(this);
            var oldFolderId = drag.attr('data-folderId');
            var taskDataId = drag.attr('data-id');
            var newFolderId = element.attr('data-id');
            ProjectTaskManager.moveTaskToProject(oldFolderId, taskDataId, newFolderId);
            if (oldFolderId !== newFolderId)
                drag.remove();
        }); //reorder projects and tasks when task is dropped in another project

        $(document).on("click", ".delete_icon", function (e) { //deleting project
            e.stopPropagation();
            var $thisElement = $(this);
            var data_id = $thisElement.data('id');
            ProjectTaskManager.deleteFromStorage(data_id);
            $thisElement.parent().remove();
            $tasks.empty();
            checkForActive();
            calendar.editTaskDatesToCalendar();
        }); // delete project

        $(document).on("click", ".projects_name", function (e) { //change active folder
            var _this = this;
            clicks++;  //count clicks
            if (clicks === 1) {
                timer = setTimeout(function () {
                    clicks = 0;  //after action performed, reset counter
                    var x = $(_this).parent();
                    ProjectTaskManager.activeFolder(x);
                    plugIns.addDroppable();
                    render.all();
                    var nowDate = new Date();
                    $('#calendar').datepicker("setDate", nowDate);
                    $('#task_name_input').css("display", "inline");
                }, DELAY);

            } else {
                clearTimeout(timer);  //prevent single-click action
                clicks = 0;  //after action performed, reset counter
                var element = $(_this);
                editProjectName(element);
            }
        }); //change active folder on single click or enter project name editor on double click

        $(document).on("keydown", ".projects_name_editor", function (e) { // edit project name
            var clicked = $(this);
            var val = clicked.val();
            if (e.which == 13) {
                if (!val)
                    return;
                var data_id = clicked.data('id');
                var name = clicked.prev();
                ProjectTaskManager.editProject(data_id, val);
                name.text(val);
                removeEditor();

            } else {
                if (e.which == 27) {
                    removeNameEditor();
                }
            }
        }); //change project name on enter or cancel on esc

        $addProjectButton.click(function () {
            if (!$projectInput.val())
                return;
            var name = $projectInput.val();
            $("#task_name_input").css("display", "inline");
            ProjectTaskManager.deactivateAll();
            ProjectTaskManager.addNewProject(name);
        }); // add new project on plus button

        $projectInput.keydown(function (e) {
            if (e.which == 13) {
                if (!$('#add_list').val())
                    return;
                var name = $projectInput.val();
                $("#task_name_input").css("display", "inline");
                ProjectTaskManager.deactivateAll();
                ProjectTaskManager.addNewProject(name);
                $projectInput.blur();
            } else {
                if (e.which == 27) {
                    $('#add_list').val('');
                    $('#add_list').blur();
                }
            }
        }); // add new project on enter or cancel on esc
    }

    me.init = function () {
        render.renderProjects();
        attachEvents();
    };

    return me;
}