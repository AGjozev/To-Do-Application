/**
 * Created by AGjozev on 5/20/2016.
 */

var calendar = (function() {
    var time ={};
    var eventDates = [];

    time.markDates = function() {
        var $calendar = $('#calendar');
        $calendar.datepicker({
            dateFormat: 'M dd',
            altFormat: 'M dd',
            onSelect: function(dateText, inst) {
                searchByDate();

            },
            beforeShowDay: function(date) {
                var nowDate = new Date();
                var now = $.datepicker.formatDate("mm dd", nowDate);
                var formatDate = $.datepicker.formatDate("M dd", date);
                var parseDate = $.datepicker.formatDate("mm dd", date);
                if (eventDates.indexOf(formatDate)==-1){
                    return [true, ""];
                }else{
                    if (parseDate<now){
                        return [true, "oldMarkedDate"];
                    }else{
                        return [true, "markedDate"];
                    }
                }

            }
        });

        $calendar.datepicker( "refresh" );
    };

    time.populateDatesArray = (function(){
        eventDates = storageData.getAllTasksForCalendar();
        time.markDates();
    }());

    time.editTaskDatesToCalendar = function() {
        eventDates = storageData.getAllTasksForCalendar();
        time.markDates();
    };

    $(document).on("click", "#view_icon", function (){
        render.all();
        $("#task_name_input").css("display","inline");
        var nowDate = new Date();
        $('#calendar').datepicker( "setDate", nowDate);
    }); // return from search by date

    return time;

    function searchByDate(){
        render.renderTasksForSearch();
        $('#task_name_input').css("display", "none");
        var $message = $("<h2 class='no_tasks'>There are no tasks on this date!</h2>");
        var myDate = $( "#calendar" ).datepicker( "getDate" );
        var searchDate = $.datepicker.formatDate("M dd", myDate);
        $('#all_tasks_title').text("Search results").css("color","#60990f");
        $(".projects_list").removeClass("active");
        $(".task_container_hidden").removeClass("task_container_hidden");
        var $taskDate = $(".time");
        for (var i = 0; i < $taskDate.length; i++) {
            var dateText = $($taskDate[i]).text();
            var counter = 0;
            if (dateText.toString() == searchDate.toString()) {
                counter++;

            }
            if (counter === 0) {
                $($taskDate[i]).parent().parent().addClass("task_container_hidden");
                $($taskDate[i]).parent().parent().removeClass('visible')
            } else {
                $($taskDate[i]).parent().parent().removeClass("task_container_hidden");
                $($taskDate[i]).parent().parent().addClass("visible");
                $($taskDate[i]).parent().parent().attr("data-pos", counter);

            }

        }
        if($(".visible").length == 0){
            $(".tasks_wrapper").append($message);
        }else{
            $message.remove();
        }

    }

}());

