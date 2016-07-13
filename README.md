# To-Do-Application

https://agjozev.github.io/To-Do-Application/

## About
This is a JavaScript application created as a result of a front end development learning project.
It uses browsers local storage as repository for the tasks and projects.

## Description
This application has all the usual operations for this type of apps and more.
The basic use of this app is improving on organizing your activities by structuring them in separate projects and having a nice overview of your tasks and their due dates. 
This is done by adding new projects and adding tasks to every project. Each task is defined by its name and due date, with possibility of adding a photo and location as additional task attributes.
You can check the tasks when they are completed or un-check them if you want them active again, or you can delete them permanently.
Every attribute of the task is editable, the name of the task, due date, location and photo.
The tasks are sortable in their own project as well as you can drag and drop them in any other desired project.

The projects are also sortable. Each project is defined by its name and a counter showing the number of tasks for that project including the checked (done) tasks.
The projects can be deleted permanently too. Deleting a project will automatically delete all the tasks in that project.
Projects names are also editable.

## Calendar
There is a calendar on which all the due dates for the tasks from all the projects are clearly marked. The dates for the checked (done) tasks are not marked on the calendar.
If a due date has passed, the task name, date and the calendar date are marked in red.

## Task Location
Every task has its location. While some locations are used every day like home, workplace etc. many tasks are performed at new locations, or locations that are rarely used. By adding a map on which you can pinpoint the location of the task, you’ll have a reminder for that vital information.
On the first load the application will ask for your permission to allow your location information to be used. 
If allowed every task, when created, will use your current location at that time as a default location on the map. This can be easily edited. Clicking on the pin icon on the task will open a map pop up. By moving the pin on the map on your desired location and then clicking add location, or by searching for the address in the input field and then clicking add location you’ll have your task location set.
If the permission is not given every task, when created, will have default location in the center of Skopje, Republic of Macedonia.

## Task Photo
Sometimes textual description just isn’t enough. Having a photo associated with the task can help you remember details that can’t be easily and shortly described in a textual manner. 
When creating a new task, you’ll get a pop up with two input fields. The first one is for the due date of the task. This one is mandatory. The other one is for uploading a photo. You can chose to upload photo at this moment, or you can create the task and then by clicking on the camera icon on the task a pop up with the upload field will appear and you can upload the photo.
By clicking on the same camera icon the photo will appear in form of a pop up, with an edit button in the upper right corner. You can use this button to change the photo at any time.

## Search
There is a search input field in the upper left corner.
This is a simple task search that returns all the tasks from all the projects that contain the searched text in their names. 
You can also search by tasks due date by clicking on the calendar. You’ll get all the tasks with the selected due date.



