# Deluge Web Browser


---

Deluge Web Browser is a plugin for [Deluge](http://deluge-torrent.org) that
can be used to browse the downloaded torrents by starting a webserver.

This is only a webui plugin at the moment, and the parametrisation needs to be done by *hand*
(if the default configuration is not satisfactory).

The plugin add a torrent submenu to browse the downloaded folder, then directory or the downloaded file,
or retrieve it content in a zip.

Features
--------
- Web browser
- Browse the standard download directory
- Download all files of a torrent in a zip.

Compatibility
-------------
- Requires at least Deluge 1.3.3
- Was not tested on Deluge 2.x

Limitations / Todo
-------------
- Create interface for customisation in the WebUi
- Use the **twisted** native web server to serve the files, as
[SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html#module-SimpleHTTPServer)
is not recommended for production
- Maybe a GTK plugin, but unlikely to be high priority considering the main usage of the tool

## Installation
Unfortunately, because of the plugin architecture of deluge it does nto seem possible to just release on pypi.

Instead, download the [egg file](https://github.com/aerospeace/DelugeWebBrowser/releases/download/v0.1/DelugeWebBrowser-0.1.2-py2.7.egg)
and copy it to ~/.config/deluge/plugins/

Alternatively, you can build the egg file from source.

After that:
1. Restart deluged and deluge-web
2. Enable the plugin with deluge-console plugin --enable `deluge-console  plugin  --enable DelugeWebBrowser`


## Documentation and testing
Documentation and testing is not yet there. Will come on following site when available:
[aerospeace.github.io/DelugeWebBrowser](https://aerospeace.github.io/DelugeWebBrowser).

## Development
See [CONTRIBUTING.md](CONTRIBUTING.md) for information related to developing the code.
