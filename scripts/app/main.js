/**
 * Created by AGjozev on 3/25/2016.
 */

(function toDoApp() {

    var taskView = new TaskView();
    var projectView = new ProjectView();
    var search = new Search();


    /* localStorage.clear(); */ /* deleting everything from storage */

    mixpanel.track("#add_task_button");
    mixpanel.track("#add_task_button");
    mixpanel.track("#task_name_input");
    mixpanel.track("#search_icon");
    mixpanel.track(".plus_icon");
    mixpanel.track("#add_list");
    mixpanel.track(".photo_icon");
    mixpanel.track("#edit_photo");
    mixpanel.track(".map_icon");
    mixpanel.track(".task_name");
    mixpanel.track(".edit_name_input");
    mixpanel.track(".time");
    mixpanel.track("#add_button");
    mixpanel.track(".checkbox");
    mixpanel.track(".delete_icon_task");
    mixpanel.track(".delete_icon");
    mixpanel.track(".projects_name");
    mixpanel.track(".projects_name_editor");


    function deviceDetection() {
        var $projects = $('.projects');
        var isMobile = false; //initiate as false

        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
            isMobile = true;

        if (isMobile) {
            $(window).on("resize", function () {
                if ($(window).width() > 680) {
                    $("#side_menu").css("display", "block");
                } else {
                    $("#black_filter").css("display", "none");
                    $("#side_menu").css("display", "none");
                    $("#body_container").animate({ left: '0' }, 350);
                }
                if ($(window).height() < 481) {
                    $("#calendar_container").css("display", "none");
                    $projects.css({
                        "height": "-moz-calc(100% - 166px)",
                        "height": "-webkit-calc(100% - 166px)",
                        "height": "calc(100% - 166px)"
                    });
                    $("#add_project").css("border-bottom", "none");
                }
                if ($(window).height() > 480 && $(window).width() < 961) {
                    $("#calendar_container").css("display", "block");
                    $("#add_project").css("border-bottom", "solid 2px #cdd3da");
                    $projects.css({
                        "height": "-moz-calc(100% - 310px)",
                        "height": "-webkit-calc(100% - 310px)",
                        "height": "calc(100% - 310px)"
                    })
                }

                if ($(window).height() > 480 && $(window).height() < 737) {
                    $("#calendar_container").css("display", "block");
                    $("#add_project").css("border-bottom", "solid 2px #cdd3da");
                    $projects.css({
                        "height": "-moz-calc(100% - 340px)",
                        "height": "-webkit-calc(100% - 340px)",
                        "height": "calc(100% - 340px)"
                    })
                }

                if ($(window).height() > 480 && $(window).width() > 960) {
                    $("#calendar_container").css("display", "block");
                    $("#add_project").css("border-bottom", "solid 2px #cdd3da");
                    $projects.css({
                        "height": "-moz-calc(100% - 400px)",
                        "height": "-webkit-calc(100% - 400px)",
                        "height": "calc(100% - 400px)"
                    })
                }

            });
        } //  mobile rotation window resize


        if ($(window).width() < 481) {
            $("#side_menu").css("display", "none");
            $("#black_filter").css("display", "none");
        } else {
            plugIns.addUIPlugIns();
        }

        if ($(window).height() < 481) {
            $("#calendar_container").css("display", "none");
            $("#add_project").css("border-bottom", "none");
            $projects.css({
                "height": "-moz-calc(100% - 164px)",
                "height": "-webkit-calc(100% - 164px)",
                "height": "calc(100% - 164px)"
            })
        }
    } // device detection


    function attachEvents() {

        $(document.body).click(function (e) {
            if (e.target.className == "edit_name_input" || e.target.className == "projects_name_editor") {
                return;
            } else {
                $(document).trigger('removeTaskNameEditor');
                $(document).trigger('removeProjectEditor');
            }
        });

        $(document.body).on("keydown", function (e) {
            if (e.which == 27) {
                render.all();
                var nowDate = new Date();
                $('#calendar').datepicker("setDate", nowDate);
                $('#task_name_input').css("display", "inline");
            }
        });

        $(document).on("emptyStorage noProjects", function () {
            $("#task_name_input").css("display", "none");
            $('#all_tasks_title').text('Enter New Project');
        });

        $(document).on('newProjectAdded newTaskAdded newActiveProject emptyProject', function () {
            render.all();
        });

        $(document).on('taskMovedToAnotherProject taskDeletedFromStorage', function () {
            render.renderProjects();
        });





    } // global app events and search events

    attachEvents();
    deviceDetection();
    taskView.init();
    projectView.init();
    search.init();


}());

