/**
 * Plugin: "remote_optgroups" (Tom Select.js)
 * Copyright (c) contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import type TomSelect from '../../tom-select.ts';
import { CBOptions } from './types.ts';

export default function(this:TomSelect, userOptions:CBOptions) {
	var self = this;
	
	const cbOptions : CBOptions = Object.assign({
		triggerChange	: true,
		callback		: function (optgroup) {
			var capitalised = optgroup.charAt(0).toUpperCase() + optgroup.substring(1);
			var group = {
				label: capitalised
			};

			group[this.settings.optgroupValueField] = optgroup;

			return group;
		},
	}, userOptions);
	
	self.hook('before','refreshOptions',()=>{
		
		var results = self.search(query);
		
		for (i = 0; i < results.items.length; i++) {

			let option = self.options[results.items[i].id];
			if( option === undefined ) continue;
			
			optgroup    = option[self.settings.optgroupField] || '';
			optgroups   = Array.isArray(optgroup) ? optgroup : [optgroup];
			
			for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
				
				optgroup = optgroups[j];
			
			
				let regGroup;
				if ( self.optgroups[optgroup] === undefined && typeof cbOptions.callback === 'function' && (regGroup = cbOptions.callback.apply(self, [optgroup]))) {
					self.addOptionGroup(regGroup[label], regGroup);
					//self.registerOptionGroup(regGroup[label]);
				}
			}
		}
	});

};


