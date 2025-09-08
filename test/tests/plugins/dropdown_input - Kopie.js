


describe('plugin: dynamic_optgroups', function() {

	it_n('should register should not care optionGroupRegister is not set', function () {
        		var test = setup_test('<select>', {
					plugins: ['remote_optgroups'],
	          		options: [
	            		{ value: 'a', grp: 'someGroup' },
	            		{ value: 'b', grp: 'anotherGroup' },
	            		{ value: 'c', grp: 'anotherGroup' }
	          		],
	          		optgroupValueField: 'val',
	          		optgroupField: 'grp',
        		});
        		test.instance.refreshOptions();
        		assert.deepEqual(test.instance.optgroups, {}, '2');
      		});

			it_n('should register optgroups if optionGroupRegister is set', function () {
        		var test = setup_test('<select>', {
					plugins: ['remote_optgroups'],
			        options: [
			        	{ value: 'a', grp: 'someGroup' },
			            { value: 'b', grp: 'anotherGroup' },
			            { value: 'c', grp: 'anotherGroup' }
			        ],
	          		optgroupValueField: 'val',
	          		optgroupField: 'grp',
	          		optionGroupRegister: function (optgroup) {
	            		var group = {};
	            		group['label'] = optgroup;
	            		group['val'] = optgroup;

	            		return group;
	          		}
        		});
	        test.instance.refreshOptions(true);
        	assert.deepEqual(test.instance.optgroups, {
          			'someGroup': { label: 'someGroup', val: 'someGroup', $order: 4 },
          			'anotherGroup': { label: 'anotherGroup', val: 'anotherGroup', $order: 5 }
        		}, '2');
     	 	});
});
