var WeightMeter = WeightMeter || {};

WeightMeter.List = function (){
	var self = this;
	self.measures = [];

	self.addMeasure = function(measure){

		if (self.hasMeasure(measure.date)) {
			throw "A new measure cannot be added to the same day";
		}

		var last = self.measures.last();
		if (last) {
			measure.difference = measure.measure - last.measure;
		} else {
			measure.difference = 0;
		}

		self.measures.push(measure);
		//TODO: Calculate the difference (if apliable) with the previous week
	};

	self.getLine = function(date)
	{
		var filtered = self.measures.filter(function(item){
			return item.date.getDate() === date.getDate();
		});

		if (filtered.length != 1){
			return null;
		}

		return filtered[0];
	}

	self.hasMeasure = function(date){
		var measure = self.getLine(date);
		return measure != null;
	};

	self.itemCount = function(){
		return self.measures.length;
	};

	self.empty = function(){
		self.measures = [];
	};
};