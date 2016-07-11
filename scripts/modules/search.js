/**
 * Created by AGjozev on 5/26/2016.
 */
function Search() {
    var me = {};
    var $searchInput = $('#search');

    function searchTasks() {
        var $searchInput = $('#search');
        render.renderTasksForSearch();
        $('#task_name_input').css("display", "none");
        var $message = $("<h2 class='no_tasks'>There are no such tasks!</h2>");
        $('#all_tasks_title').text("Search results").css("color", "#60990f");
        $(".projects_list").removeClass("active");
        $(".task_container_hidden").removeClass("task_container_hidden");
        var $taskName = $(".task_name");
        var separator = /\W|_/g;
        var $searchTerms = $searchInput.val();
        var searchTermsArr = $searchTerms.split(separator);
        for (var i = 0; i < $taskName.length; i++) {
            var counter = 0;
            var taskNameArr = $taskName[i].textContent.split(separator);
            for (var j = 0; j < taskNameArr.length; j++) {
                for (var x = 0; x < searchTermsArr.length; x++) {
                    if (searchTermsArr[x].toLowerCase() === taskNameArr[j].toLowerCase()) {
                        counter++;
                    }
                }
            }
            if (counter === 0) {
                $($taskName[i]).parent().addClass("task_container_hidden");
                $($taskName[i]).parent().removeClass('visible')
            } else {
                $($taskName[i]).parent().removeClass("task_container_hidden");
                $($taskName[i]).parent().addClass("visible");
                $($taskName[i]).parent().attr("data-pos", counter);

            }


            var $searchTasks = $(".visible");
            $searchTasks.detach().sort(function (a, b) {
                return $(b).attr('data-pos') - $(a).attr('data-pos');

            });

            $('.tasks_wrapper').append($searchTasks);
        }
        if ($(".visible").length == 0) {
            $(".tasks_wrapper").append($message);
        } else {
            $message.remove();
        }

    } // main task search by name

    function attachEvents() {

        $('#search_icon').click(function () {
            if (!$searchInput.val())
                return;
            searchTasks();
            $("ol.projects").sortable("disable").disableSelection();
            $("ol.tasks_wrapper").sortable("disable").disableSelection();
        });

        $searchInput.keydown(function (e) {
            if (e.which == 13) {
                if (!$searchInput.val())
                    return;
                searchTasks();
                $("ol.projects").sortable("disable");
                $("ol.tasks_wrapper").sortable("disable");
            } else {
                if (e.which == 27) {
                    $searchInput.blur();
                    $searchInput.val('');
                    render.all();
                    $("ol.projects").sortable("enable");
                    $("ol.tasks_wrapper").sortable("enable");
                    $('#task_name_input').css("display", "inline");
                }
            }
        });

        $searchInput.change(function () {
            if (!$searchInput.val()) {
                render.all();
                $("ol.projects").sortable("enable");
                $("ol.tasks_wrapper").sortable("enable");
            }
        });


    }

    me.init = function () {
        attachEvents();
    };

    return me;
}