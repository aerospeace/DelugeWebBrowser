Ext.namespace('Deluge.plugins.delugewebbrowser.util');


if (typeof(console) === 'undefined') {
  console = {
    log: function() {}
  };
}

if (typeof(Object.keys) === 'undefined') {
  Object.keys = function(obj) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  };
}


Deluge.plugins.delugewebbrowser.PLUGIN_NAME = 'DelugeWebBrowser';
Deluge.plugins.delugewebbrowser.MODULE_NAME = 'delugewebbrowser';
Deluge.plugins.delugewebbrowser.DISPLAY_NAME = _('DelugeWebBrowser');

Deluge.plugins.delugewebbrowser.STATUS_NAME =
  Deluge.plugins.delugewebbrowser.MODULE_NAME + '_name';


Deluge.plugins.delugewebbrowser.util.isReserved = function(id) {
  return (id == 'All' || id == 'None' || id == '');
};

Deluge.plugins.delugewebbrowser.util.getParent = function(id) {
  return id.substring(0, id.lastIndexOf(':'));
};

Deluge.plugins.delugewebbrowser.Plugin = Ext.extend(Deluge.Plugin, {

  name: Deluge.plugins.delugewebbrowser.PLUGIN_NAME,

  onEnable: function() {
    this.registerTorrentStatus(Deluge.plugins.delugewebbrowser.STATUS_NAME,
      Deluge.plugins.delugewebbrowser.DISPLAY_NAME,
      {
        colCfg: {
          sortable: true
        }
      }
    );

    this.waitForClient(10);
  },

  onDisable: function() {
    if (this._rootMenu) {
      this._rootMenu.destroy();
      delete this._rootMenu;
    }

    this.deregisterTorrentStatus(Deluge.plugins.delugewebbrowser.STATUS_NAME);

    console.log('%s disabled', Deluge.plugins.delugewebbrowser.PLUGIN_NAME);
  },

  waitForClient: function(triesLeft) {
    if (triesLeft < 1) {
      console.log('%s RPC configuration timed out',
        Deluge.plugins.delugewebbrowser.PLUGIN_NAME);
      return;
    }

    if (deluge.login.isVisible() || !deluge.client.core ||
        !deluge.client.delugewebbrowser) {
      var self = this;
      var t = deluge.login.isVisible() ? triesLeft : triesLeft-1;
      setTimeout(function() { self.waitForClient.apply(self, [t]); }, 1000);
    } else {
      // this._pollInit();
      this.buildMenu();
    }
  },

  buildMenu: function() {
    if (this._rootMenu) {
      this._rootMenu.destroy();
      delete this._rootMenu;
    }
    var mainMenu = new Ext.menu.Menu({ ignoreParentClicks: true });
    mainMenu.add({ xtype: 'menuseparator' });
    mainMenu.addMenuItem({
      text: _('Show default download folder'),
      label: 'None',
      handler: this.open_main,
      scope: this
    });
    mainMenu.add({ xtype: 'menuseparator' });
    mainMenu.addMenuItem({
      text: _('Open torrent'),
      label: 'None',
      handler: this.open_torrent,
      scope: this
    });
    mainMenu.addMenuItem({
      text: _('Download in zip'),
      label: 'None',
      handler: this.open_zip_file,
      scope: this
    });
    this._rootMenu = deluge.menus.torrent.add({
      text: Deluge.plugins.delugewebbrowser.DISPLAY_NAME,
      menu: mainMenu
    });
  },

  open_main: function(item, e) {
    deluge.client.delugewebbrowser.get_base_url({
        success: function(result) {
          window.open(`${result}`);
          },
        scope: this
    })
  },

  open_torrent: function(item, e) {
    var current_selection = deluge.torrents.getSelected().data;
    var name = current_selection['name'];
    deluge.client.delugewebbrowser.get_base_url({
        success: function(result) {
          window.open(`${result}/${encodeURI(name)}`);
          },
        scope: this
    })
  },

  open_zip_file: function(item, e) {
    var current_selection = deluge.torrents.getSelected().data;
    var save_path = current_selection['save_path'];
    var name = current_selection['name'];
    deluge.client.delugewebbrowser.get_zip_url(
        save_path,
        name,
        {
        success: function(result) {
          window.open(`${result}`);
          },
        scope: this
        })
  },

});

Deluge.registerPlugin(Deluge.plugins.delugewebbrowser.PLUGIN_NAME,
  Deluge.plugins.delugewebbrowser.Plugin);
