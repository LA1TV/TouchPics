Plan
===

* :x:Image interaction
  * :white_check_mark:Dragging
  * :white_check_mark:Scaling
  * :white_check_mark:Rotating
  * :white_check_mark:Locking
  * :x:Drawing on images
  * :white_check_mark:Z Ordering of images, images come to the top when touched
* :x:Image menu
  * :white_check_mark:Opening new images
  * :white_check_mark:Closing open images
  * :white_check_mark:Newly opened images open at reasonable scale
  * :white_check_mark:Newly opened images open in a reasonable location ~~(may be tricky to do something complex like avoid placing them on top of other images)~~ (Didn't even try that)
  * :white_check_mark:Images in menu scale to menu height
  * :x:Images in menu have a nice border
  * :x:Scroll through images in menu
* :x:Backend server - to allow remote changing of settings (Will be created as a separate repository, will probably be python/flask)
  * :x:Change pictures in menu remotely
  * :x:File picker to choose images
  * :x:Images added to the menu are saved/copied to a local directory
* :x:Remote client - to allow full remote control (as in, everything that can be done with the touchscreen at least) via the backend server
  * :x:Remote view of image locations (WebSockets!)
  * :x:Remote control of images (drag, scale, rotate) and menu (open, close and lock images)
* :x:[Juicyness](http://www.youtube.com/watch?v=Fy0aCDmgnxg)
  * :x:Images shrink on close
  * :x:Images expand on open 
  * :x:Images in menu respond when tapped
  * :x:Menu can swipe scroll
  * :x:Menu will drop down and pop back up when the images on it are changed
  * :x:Hide the menu by swiping down/Open the menu by swiping up