module.exports = {
	hasChanged(oldParams, newParams) {
		let changed = false;
		$.each(newParams, (paramKey) => {
			changed = (
				!oldParams.hasOwnProperty(paramKey)
				||
				oldParams[paramKey] !== newParams[paramKey]
			);
			if(changed) {
				return false;
			}
		});
		return changed;
	},
};