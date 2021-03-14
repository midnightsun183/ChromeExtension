app.bind({
    config: {

        showLogs: false,
        debug: true,

        //------------------------------------------------------------------------
        //--- REQUIRE SETTINGS - THIS CHANGES THE DEFAULT REQUIRED ITEMS TO SYNC -
        //------------------------------------------------------------------------
        //set save data url
        requireSettings: {},

        //------------------------------------------------------------------------
        //--- BACKUP SETTINGS - THIS CHANGES THE DEFAULT BEHAVIOR OF ALL BACKUPS -
        //--- By default the 'value' property is empty and updated when needed ---
        //------------------------------------------------------------------------
        //set save data url
        backupSettings: {
            //has started
            isStarted: false,
            //set backup wait
            waitCount: 0,
            //set wait max
            waitMax: 5,
            //set depth
            depth: 1,
            //set max depth
            depthMax: 3,
            //defer promise speed
            promiseSpeed: 100,
            //spped in miliseconds
            scrollSpeed: 2500,
            //limit scroll repeats
            scrollLimit: 100,
            //collection
            collectionIndex: 0,
            //set index
            priorityIndex: 0,
            //set depth index
            itemsDone: 0,
            //set depth index
            depthSize: 0,
            //set remaining
            remaining: 0,
            //se tcompleted
            totalDone: 0,
            //set in progress
            inProgress: false,
            //set page changes
            pageChanged: false,
            //set depth changed
            depthChanged: false,
            //page hash
            pageHash: false,
            //data hash
            dataHash: false,
            //set scheduled flag
            scheduled: false,
            //set start date
            startDate: 'Tue May 28 2021 19:53:27 GMT-0800 (Pacific Standard Time)',
            //set started on date
            startedOn: '',
            //set ended on date
            endedOn: '',
            //set service
            service: '',
            //set collection
            collection: '',
            //set estimated end
            endEstimate: 0,
            //set items in queue
            itemInQueue: [],
            //set item hash
            itemsHash: {},
            //set depth item
            depthItem: {},
            //set done hash map
            doneDepth: {},
            //set completed
            completed: {},
            //use priority only
            priorityOnly: {},
            //set recurse settings
            depthOptions: {
                //list to recurse 
                binding: {},
                //use priority only
                priorityOnly: {},
                //set priority
                priority: {}
            },
            //set sort by
            sortBy: {},
            //priority in collection
            priority: {}
        },


        //------------------------------------------------------------------------
        //--- BIND SETTINGS - THIS SETS DATA BINDING ON USER SPECIFIC DETAILS  ---
        //--- By default the 'value' property is empty and updated when needed ---
        //------------------------------------------------------------------------
        //set save data url
        bindSettings: {},

        //------------------------------------------------------------------------
        //--- GENERAL - YOU ARE FREE TO CHANGE THE  CATEGORIES AND SERVICES ------
        //--- Changing the below will give you want a different set of options ---
        //------------------------------------------------------------------------
        //search collectiones
        searchCollections: [],
        //search services
        searchServices: [],
        //search auto start
        autoStart: {}
    },
    questions: {
        experience: {
            'search': 'years of'
        },
        certification: {
            'search': 'certification'
        },
        startWork: {
            'search': 'start immediately'
        },
        notice: {
            'search': 'Notice period',
        },
        location: {
            'search': 'Current Location'
        },
        authorized: {
            'search': 'authorized'
        },
        citizenship: {
            'search': 'citizenship'
        },
        employment: {
            'search': 'employment'
        },
        education: {
            'search': 'education'
        },
        address: {
            'search': 'address '
        },
        employed: {
            'search': 'employed'
        },
        fullTime: {
            'search': 'Full Time employee'
        },
        relocate: {
            'search': 'relocate'
        },
        workin: {
            'search': 'work in'
        },
        city: {
            'search': 'City'
        },
        onsite: {
            'search': 'work onsite'
        },
        available: {
            'search': 'available'
        },
        veteran: {
            'search': 'Veteran'
        },
        ethnicity: {
            'search': 'Ethnicity'
        },
        immigration: {
            'search': 'immigration status'
        },
        considering: {
            'search': 'Considering a Change'
        },
        sponsorship: {
            'search': 'sponsorship'
        },
        postalCode: {
            'search': 'Postal Code'
        },
        commuting: {
            'search': 'commuting'
        },
        clearance: {
            'search': 'clearance'
        },
        polygraph: {
            'search': 'polygraph'
        },
        relative: {
            'search': 'relative'
        },
        english: {
            'search': 'english'
        },
        salary: {
            'search': 'salary'
        },
        state: {
            'search': 'State'
        },
        gender: {
            'search': 'Gender'
        },
        start: {
            'search': 'to start'
        },
        name: {
            'search': 'Name'
        },
        race: {
            'search': 'Race'
        },
        sms: {
            'search': 'SMS'
        }
    },
    answers: {
        experience: {
            'Content Management': 16,
            'Supply Chain': 6,
            'Google Ads': 10,
            'Group Policy': 4,
            'Oracle Cloud': 3,
            'Oracle SQL': 4,
            'Google Cloud': 6,
            'Epic Systems': 1,
            'Real Estate': 5,
            'Microsoft': 12,
            'Azure IoT': 3,
            'Azure DevOps': 3,
            'Manufacturing': 1,
            'Consulting': 12,
            'Engineering': 12,
            'Management': 7,
            'Marketing': 10,
            'Advertising': 8,
            'Technology': 12,
            'Powershell': 5,
            'Embedded': 8,
            'WordPress': 12,
            'VBScript': 12,
            'Magento': 8,
            'Mulesoft': 1,
            'Dynamics': 5,
            'GraphQL': 3,
            'VSphere': 3,
            'Invision': 4,
            'Drupal': 9,
            'ESXi': 4,
            'UiPath': 1,
            'Retail': 12,
            'GCP': 5,
            'XML': 16,
            'VBA': 5,
            'UML': 4,
            'Unix': 8,
            'Linux': 8,
            'Vue.js': 3,
            'Laravel': 4,
            'Python': 6,
            'SOAP': 12,
            'JAVA': 14,
            'SaaS': 12,
            'SSRS': 5,
            'Cisco': 5,
            'Azure': 5,
            'Sales': 12,
            'Jamf': 3,
            'AWS': 8,
            'GCP': 5,
            'C++': 5,
            'C#': 5
        },
        certification: {
            'Amazon': 'no',
            'Dynamics': 'no',
            'Cisco': 'no'
        },
        authorized: {
            'authorized': 'yes',
        },
        fullTime: {
            'employee': 'yes'
        },
        employment: {
            'employment': 'no',
        },
        education: {
            'Bachelor': 'no'
        },
        relocate: {
            'relocate': 'yes',
            'work_in': 'yes'
        },
        workin: {
            'workin': 'yes'
        },
        employed: {
            'employed': 'no'
        },
        english: {
            'english': 'yes'
        },
        startWork: {
            'start': 'yes',
        },
        onsite: {
            'onsite': 'yes',
        },
        sponsorship: {
            'sponsorship': 'no'
        },
        comfortable: {
            'comfortable': 'yes'
        },
        commuting: {
            'commuting': 'yes'
        },
        clearance: {
            'clearance': 'no',
        },
        polygraph: {
            'polygraph': 'no',
        },
        relative: {
            'relative': 'no'
        },
        available: {
            'available': 'any time'
        },
        sms: {
            'SMS': 'yes'
        },
        salary: {
            'salary': '245000'
        },
        state: {
            'State': 'Texas'
        },
        gender: {
            'Gender': 'Male'
        },
        city: {
            'City': 'Houston'
        },
        postalCode: {
            'ZIP': '77002'
        },
        notice: {
            'notice': '2 week'
        },
        name: {
            'Name': 'Fortune Vieyra'
        },
        location: {
            'location': 'San Jose, CA'
        },
        address: {
            'address': '945 McKinney Street #574' 
        },
        considering: {
            'considering': 'Seeking new opportunities'
        },
        citizenship: {
            'citizenship': 'U.S. Citizen'
        },
        immigration: {
            'imigration': 'US Citizen'
        },
        ethnicity: {
            'ethnicity': 'Black'
        },
        veteran: {
            'veteran': 'I am not'
        },
        start: {
            'start': 'next week'
        },
        race: {
            'race': 'Black'
        },
    },
});