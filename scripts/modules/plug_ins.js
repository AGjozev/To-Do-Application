/**
 * Created by AGjozev on 5/20/2016.
 */

var plugIns = (function() {
    var me={};

    $(function () {
        $("#add_date").datepicker({
            dateFormat: 'M dd',
            altFormat: 'M dd',
            minDate: 0
        });
    });

    me.addUIPlugIns = function () {


        $(function () {
            $(document).tooltip({
                items: "h3",
                content: function () {
                    return $(this).text();
                },
                show: 1800
            });
        });

        $(function () {
            $("ol.projects").sortable({
                axis: "y",
                delay: 150,
                update: function () {
                    var folderId = $("ol.projects").sortable("toArray", {attribute: "data-id"});
                    ProjectTaskManager.moveProject(folderId);
                }
            });


            $("ol.tasks_wrapper").sortable({
                appendTo: document.body,
                cursor: 'move',
                zIndex: 200,
                opacity: 0.75,
                connectWith: ".projects_list",
                scroll: false,
                containment: 'window',
                delay: 150,
                helper: 'clone',
                update: function () {
                    var $taskSort = $("ol.tasks_wrapper");
                    var taskId = $taskSort.sortable("toArray", {attribute: "data-id"});
                    var folderId = $taskSort.sortable("toArray", {attribute: "data-folderId"});
                    if (taskId.length == 0 || folderId.length == 0){
                        $(document).trigger("emptyProject");
                    }else {
                        ProjectTaskManager.moveTask(folderId, taskId);
                    }
                }

            });
        });

    };

    me.addDroppable = function () {
        $(function () {
            $(".projects_list").droppable({
                hoverClass: "drop_hover",
                tolerance: 'pointer',
                accept: ".task_container"
            });
        });
    };

    return me;

}());