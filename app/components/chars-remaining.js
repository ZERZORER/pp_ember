import Ember from 'ember';

export default Ember.Component.extend({
	charsReimainig: Ember.computed('count', 'limit', function(){
		return this.get('limit') - this.get('count');
	}),

	closeToLimit: Ember.computed('charsReimainig', 'noticeCount', function(){
		return this.get('charsReimainig') <= this.get('noticeCount');
	})
});
