/**
 * Created by AGjozev on 5/24/2016.
 */

function TaskView() {
    var me = {};
    var $popUp = $('.popup_container');
    var $addTaskButton = $('#add_task_button');
    var $editTaskButton = $('#edit_task_button');
    var $inputTaskName = $('#task_name_input');
    var $projects = $('.projects');
    var $tasks = $('.task_container');

    function popUpClose() {
        $popUp.fadeOut();
        setTimeout(function () {
            $inputTaskName.val('');
            $("#add_date").val('');
            $("#add_photo").val('');
            $('#task_date').css('display', 'block');
            $addTaskButton.css('display', 'inline-block');
            $editTaskButton.css('display', 'none');
            $('.edit').removeClass("edit");
        }, 800);
    }

    function popUpShow() {
        $popUp.fadeIn();
    }

    function readURL(input) {
        if (!input.files || !input.files[0])
            return;
        var FR = new FileReader();
        FR.onload = function (e) {
            $("#add_photo").attr('data-image', e.target.result);
        };
        FR.readAsDataURL(input.files[0]);
    }

    function addTask() {
        var $date = $("#add_date");
        var $photo = $("#add_photo");
        var name = $inputTaskName.val();
        var dueDate = $date.val();
        if (!$date.val())
            return;
        popUpClose();
        var imageCode = $photo.attr('data-image');
        ProjectTaskManager.addNewTask(name, dueDate, imageCode);
        calendar.editTaskDatesToCalendar();
        $photo.attr('data-image', "");
    }

    function removeNameEditor() {
        $('.edit_name_input').css('display', 'none');
        $('.task_name').css('display', 'inline');
    }

    function editTasksName(e) {
        removeNameEditor();
        var text = e.text();
        var editor = e.next();
        e.css('display', 'none');
        editor.css('display', 'inline');
        editor.val(text);
        editor.focus();
    }

    function editTasksDescription(oldDate) {
        $('#add_image').css('display', 'none');
        popUpShow();
        var $addDate = $("#add_date");
        var parseDate = $.datepicker.parseDate('M dd', oldDate);
        $addTaskButton.css('display', 'none');
        $editTaskButton.css('display', 'inline-block');
        $addDate.datepicker("setDate", new Date(parseDate));
        $(document)
            .off('click', "#edit_task_button")
            .on('click', "#edit_task_button", function () {  //edit task due date
                if (!$addDate.val())
                    return;
                var element = $('.edit');
                var date = $addDate.val();
                var taskId = element.parent().data('id');
                var folderId = element.parent().attr('data-folderId');
                var today = $.datepicker.formatDate("mm dd", new Date());
                var myDate = $.datepicker.parseDate('M dd', date);
                var parsedDate = $.datepicker.formatDate('mm dd', myDate);
                ProjectTaskManager.editTaskDate(taskId, date, folderId);
                element.text(date);
                if (today < parsedDate) {
                    element.parent().removeClass('overdue');
                    element.parent().prev().prev().removeClass('overdue');
                }
                popUpClose();
                calendar.editTaskDatesToCalendar();

            });
    }

    function editTasksDescriptionPhoto(dataId, folderId) {  //edit task photo
        $('#task_date').css('display', 'none');
        $('#add_image').css('display', 'block');
        popUpShow();
        var $addPhoto = $("#add_photo");
        var taskId = dataId;
        var folder = folderId;
        $addTaskButton.css('display', 'none');
        $editTaskButton.css('display', 'inline-block');
        $(document)
            .off('click', "#edit_task_button")
            .on('click', "#edit_task_button", function () {
                var imageCode = $addPhoto.attr('data-image');
                ProjectTaskManager.editTaskPhoto(taskId, folder, imageCode);
                var photoIcon = $(".photo_icon[data-id='" + taskId + "']");
                photoIcon.attr('data-image', imageCode);
                popUpClose();
                $('#image_container').fadeOut('slow');

                $addPhoto.attr('data-image', "");
            });
    }

    function showMap(taskId, folderId, oldLat, oldLng) {
        var $address = $("#address");
        $('#map_container').fadeIn();
        var $map = $address.geocomplete({
            map: '#map_holder',
            mapOptions: {
                zoom: 12,
                scrollwheel: true
            },
            markerOptions: {
                draggable: true
            }
        });

        var myLang = parseFloat(oldLng);
        var myLat = parseFloat(oldLat);
        var map = $address.geocomplete("map");
        var marker = $address.geocomplete('marker');
        var location = new google.maps.LatLng(myLat, myLang);
        map.setCenter(location);
        map.setZoom(13);
        marker.setPosition(location);

        $map.unbind("geocode:dragged")
            .bind("geocode:dragged", function (event, latLng) {
                myLat = latLng.lat();
                myLang = latLng.lng();
            });

        $map.unbind("geocode:result")
            .bind("geocode:result", function (event, result) {
                myLat = result.geometry.location.lat();
                myLang = result.geometry.location.lng();
            });


        $(document)
            .off('click', '#new_location')
            .on('click', '#new_location', function () {
                ProjectTaskManager.editTaskLocation(taskId, folderId, myLat, myLang);
                var mapIcon = $(".map_icon[data-id='" + taskId + "']");
                mapIcon.attr('data-lat', myLat).attr('data-lng', myLang);
                closeMap();
            });
    }

    function closeMap() {
        $('#map_container').fadeOut();
        $("#address").val('');
    }

    function attachEvents() {

        $(document).on('removeTaskNameEditor', function () {
            removeNameEditor();
        }); //remove task name editor on click away

        $('#close_button').click(function () {
            popUpClose();
        });  //Close button on the PopUp

        $('#add_button').click(function () {
            if (!$inputTaskName.val() || $projects.children().length == 0)
                return;
            popUpShow();
        });  //ADD Task button

        $inputTaskName.keydown(function (e) {
            if (e.which == 13) {
                if (!$inputTaskName.val() || $projects.children().length == 0)
                    return;
                popUpShow();
            }
        });  // open popup add new task on enter

        $addTaskButton.click(function () {
            addTask();
        });  // add task button in popup

        $(document).on("click", ".photo_icon", function () {
            var element = $(this);
            if (element.parent().hasClass('done'))
                return;
            var dataId = element.attr('data-id');
            var folderId = element.attr('data-folderId');
            var oldDate = element.next().next().next().text();
            var srcData = element.attr('data-image');
            var taskText = element.parent().prev().prev().text();
            if (srcData !== "" && srcData !== undefined) {
                var container = $('#image_container');
                container.attr('data-id', dataId).attr('data-folderId', folderId).attr('data-oldDate', oldDate);
                var image = $('#image_holder');
                container.fadeIn('slow');
                image.attr('src', srcData);
                var textImage = image.next();
                textImage.text(taskText);
                var textWidth = image.width();
                textImage.css('width', textWidth);
            }
            else {
                element.addClass('edit');
                editTasksDescriptionPhoto(dataId, folderId, oldDate);
            }
        }); // open image popup or image editor popup

        $(document).on('click', '#image_close', function () {
            $('#image_container').fadeOut('slow');
        }); //close image

        $(document).on("click", "#edit_photo", function () {
            var element = $(this);
            var dataId = element.parent().attr('data-id');
            var folderId = element.parent().attr('data-folderId');
            editTasksDescriptionPhoto(dataId, folderId);
        });  // edit photo button in edit popup

        $(document).on("click", ".map_icon", function () {
            var element = $(this);
            if (element.parent().hasClass('done'))
                return;
            var dataId = element.parent().attr('data-id');
            var folderId = element.parent().attr('data-folderId');
            var myLat = element.attr('data-lat');
            var myLng = element.attr('data-lng');
            showMap(dataId, folderId, myLat, myLng);
        });  //open map popup

        $(document).on("click", '#map_close', function () {
            $('#map_container').fadeOut();
        }); //close map popup


        $(document).on("dblclick", ".task_name", function () {
            var element = $(this);
            if (element.hasClass('done'))
                return;
            editTasksName(element)
        }); //enter task name editor

        $(document).on("keydown", ".edit_name_input", function (e) {
            var $thisElement = $(this);
            var taskId = $thisElement.data('id');
            var folderId = $thisElement.attr('data-folderId');
            var val = $thisElement.val();
            var $textElement = $thisElement.prev();
            if (e.which == 13) {
                if (!val)
                    return;
                $textElement.text(val);
                ProjectTaskManager.editTaskName(val, taskId, folderId);
                removeNameEditor();
            } else {
                if (e.which == 27) {
                    removeNameEditor();
                }
            }
        });  //edit task name on enter


        $(document).on("click", ".time", function () {
            var element = $(this);
            var oldDate = element.text();
            element.addClass("edit");
            if (element.parent().hasClass('done'))
                return;
            editTasksDescription(oldDate);
        });   //enter task date editor popup

        $(document).on("click", ".checkbox", function () {
            var element = $(this);
            var today = $.datepicker.formatDate("mm dd", new Date());
            var taskId = element.data('id');
            var folderId = element.attr('data-folderId');
            var name = element.parent().next();
            var date = name.next().next();
            var dueDate = date.text();
            var myDate = $.datepicker.parseDate('M dd', dueDate);
            var parseDate = $.datepicker.formatDate('mm dd', myDate);
            if (element.hasClass('checked')) {
                ProjectTaskManager.uncheckTask(folderId, taskId);
                element.attr("src", "assets/icons/Unchecked%20Checkbox-50.png");
                element.removeClass('checked');
                name.removeClass('done');
                date.removeClass('done');
                if (today > parseDate) {
                    name.addClass('overdue');
                    date.addClass('overdue');
                }
            } else {
                ProjectTaskManager.checkTask(folderId, taskId);
                element.attr("src", "assets/icons/Checked%20Checkbox%202-50.png");
                element.addClass('checked');
                name.addClass('done');
                date.addClass('done');
                name.removeClass('overdue');
                date.removeClass('overdue');
            }
        }); // toggle check on task

        $(document).on("click", ".delete_icon_task", function () {
            var $thisElement = $(this);
            var taskId = $thisElement.data('id');
            var folderId = $thisElement.attr('data-folderId');
            var oldDate = $thisElement.prev().text();
            ProjectTaskManager.deleteTaskFromStorage(folderId, taskId);
            calendar.editTaskDatesToCalendar();
            $thisElement.parent().parent().remove();
            if ($tasks.length == 1) {
                render.renderTasks();
            }
        });  //delete task

        $("#add_photo").on("change", function () {
            readURL(this);
        }); // send image url to reader on photo upload

    }

    me.init = function () {
        render.renderTasks();
        attachEvents();
    };

    return me;

}