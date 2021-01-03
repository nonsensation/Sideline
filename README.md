# Sideline
Scoreboard for Sport Event Streams.

Due to the current pandemic, we have had no parents, visitors, fans or supporters allowed when we had a matchday.
Although we are only a small sports club, we have been looking into live streaming these events, so at least some people could watch our games.  
However only streaming the game with no time or score given was not the best expirience for the viewers.  
We could either record it and have a scoreboard edited in afterwards, but while streaming there was no real solution to have the current time or score displayed in the stream.
And even current alternatives for OBS are either expensive behind a paywall or old, outdated and rare, meaning every scoreboard looked the same, like in the early 2000's. 
So I looked for an alternative to have a easily customized scoreboard, adaptable to different layouts and even with animations or transitions possible.
So HTML, CSS and Javascript it was.
Sideline is what I came up with.

Current version: 0.0.1

## How To Use

1. Download & install a Http Server (including a MySQL Server for now) and start it
   I used [Z-WAMP](http://zwamp.sourceforge.net/) for this.
   While using a simpler Http Server via python, I ran into [an issue with WebView2](https://github.com/MicrosoftEdge/WebView2Feedback/issues/349).
2. Download & install the *Canary* version of Microsoft Edge from here: https://www.microsoftedgeinsider.com/en-us/download
3. Build this project, tested with Visual Studio 2019 Preview (16.9.0)
4. Create an index.html in your web-server folder (or copy and paste the ones in the project to it)
5. In the Sideline-app go to Settings -> Select the url (ip:port) your web server is running at (https://localhost:8080 for example).
   The scoreboard website should be visible in the WebView Window
6. In OBS:
    - create a new *Window Capture* Source, select the Sideline-App
    - right-click in the preview-area or on the Sideline-Source and select *Filters*
    - add a new *Chroma-Key* filter

## How does it work?

- in the desktop app, you can click buttons/set values
- these get send to a website running in a WebView2 browser window via Javascript
- this window is captured by OBS, it can stay in the background
- the website changes state and displays it

## Planned Features

- sync with external clocks (via textfile, some real scoreboards only transmit their signals from a controller to the display unit wireless, so we might need custom recievers with a small microcontroller to intercept and send them to a PC)
- dynamic UI to adapt to different sports, events and layouts
- connect to OBS via network to changes scenes in the application
- store and edit team/player/match data and display in the application
- maybe easier support for text files as storage option, no need for an entire database
- same goes for the web server, find a pure .NET solution for that


   
