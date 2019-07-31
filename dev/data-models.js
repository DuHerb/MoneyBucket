

/* eslint-disable no-unused-vars */
//for MVP development, total state will consist of one user.
const state = {
  users: Array
}

const user = {
  uid: '',
  bucketList: Array, //list of currently used buckets
  dnd: Array, //need for beautiful drag and drop.  see model below
  despositHistory: Array //array to record transactions
}

const bucket = {
  uid: String,
  name: String, //user provided name = the item being saved for
  createdAt: Date, //timestamp of bucket creation
  targetValue: Number, //the $ amount this bucket is valued at
  filterType: String, //'percent' or 'static'
  staticHoldValue: Number, //if (filterType === 'static') staticAmount = $ that bucket keeps
  percentHoldValue: Number, //if filterType == 'percent', percentHoldValue is % of input that bucket holds
  isMinRequired: Boolean,
  minHoldValue: Number, //if(isMinRequired) minAmount is $ that must keep before passing value to next bucket
  currentValue: Number,
  isLocked: Boolean, //if(isLocked), bucket will be skipped and no changes made to current Value
  isPool: Boolean, //if(isPool), bucket is last bucket in stack.  This bucket will not be removable or draggable, and will collect all $ at end of reduction
  history: Array, //list of transactions. rudimentary transaction history in case I have time to implement a view to use it.
  valueChange: Number, //change in value after most recent deposit
}

const bucketTransaction = {
  date: Date, //transaction time stamp
  uid: String, //transaction id
  name: String, //user provided name = the item being saved for
  targetValue: Number, //the $ amount this bucket is valued at
  filterType: String, //'percent' or 'static'
  staticAmount: Number, //if (filterType === 'static') staticAmount = $ that bucket keeps
  isMinRequired: Boolean,
  holdMinimum: Number, //if(isMinRequired), minAmount is $ that must keep before passing value to next bucket
  previousValue: Number, //bucket value at start of transaction
  currentValue: Number, //bucket value after transaction
  isLocked: Boolean, //if(isLocked), bucket will be skipped and no changes made to current Value
  isPool: Boolean, //if(isPool), bucket is last bucket in stack.  This bucket will not be removable or draggable, and will collect all $ at end 
  bucketIndex: Number, //this bucket's position in the stack
  bucketUid: String, //this bucket's unique id
}

const depositTransaction = {
  date: Date,
  uid: String,
  amount: Number,
  bucketTransactions: Array //list of the bucketTransactions that deposit is associated with
}

//necessary object state structure for beautiful dnd
//use beautiful drag and drop tutorial code for reference

const dndState = {
  tasks: {
    'task-1':{ id: 'task-1', content: 'Take out the garbage'}, //task key and id are equal values.  Will attempt to bind them to a bucket.uid
    'task-2':{ id: 'task-2', content: 'homework'},
    'task-3':{ id: 'task-3', content: 'eat pizza'},
    'task-4':{ id: 'task-4', content: 'gid rid of snakes'},
    'task-5':{ id: 'task-5', content: 'bake cake'},
  },
  //will keep a multiple column data structure in case future designs need it.
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'] //keeps track of item order in column
    }
  },
  columnOrder: ['column-1'] //will keep track of column order if more are implemented
}