SavePoint
=========

SavePoint is a chrome extension that saves the current page scroll and snaps it back when desired. It can be found in the chrome webstore [*here*][Webstore].

Directory Structure
-------------------

    /-                          | Top-level directory (manifest.json, _locales, src)
    |- _locales                 | Required locales folder for chrome extensions.
    |- src                      | Main folder containing source code.
      |- bg                     | The background scripts that runs main extension code.
      |- js                     | Custom JS files to be loaded later. (Content Scripts)
      |- images                 | All images.
        |- icons                | Icons for toolbar button and extension icon.
        |- promo-tiles          | Promotional materials for the chrome webstore.
        |- screenshots          | Screenshots for the chrome webstore.

The extension works as follows:
------------------------------

- The manifest.json file is parsed and the resources are accounted for.
- Execution is then directed to background.html which just loads background.js
- Background.js loads several event listeners that check for new tabs, button clicks, and keyboard shortcuts.
- Those event listeners load in the content script files from the ```js``` directory as if they were functions.
- The content scripts each have a task they run which affects the extension in some way.
- In some cases the content scripts will error out. In these cases a ```handleError``` function callback is attached.

To create additional content scripts just add the file to the ```js``` directory and include them in the ```web_accessible_resources``` object in the manifest file. The same goes for any image files that the content files need access to, just put them in the ```images``` instead.

License:
-------

*This licensed under the [WTFPL](http://www.wtfpl.net/about/) :]*

  [webstore]: https://chrome.google.com/webstore/detail/savepoint/gcgddopabjjjjonmgchapnicpbgebala
