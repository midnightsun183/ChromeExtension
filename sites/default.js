//update bind settings
app.config.bindSettings = app.bind{{
    default: {

    }
},app.config.bindSettings};

app.config.backupSettings.sortBy['default'] = [

];

app.config.backupSettings.priorityOnly['default'] = false;

app.config.backupSettings.depthOptions.priorityOnly['default'] = true;

app.config.backupSettings.depthOptions.binding['default'] = {
    name: 'friends_all',
    collect: 'friends',
};

app.config.backupSettings.depthOptions.priority['default'] = [
    'profile',
    'friends_all',
];


//single - append to existing object
app.config.searchCollections = app.add([
	// {}, {}
], app.config.searchCollections );