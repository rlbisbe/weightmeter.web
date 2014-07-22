describe("WeightList", function() {
  
  var weightList = new WeightMeter.List();
  
  it("exists", function() {
    expect(weightList).toBeDefined();
  });

  beforeEach(function() {
    weightList.empty();
  });

  describe("adding 1 item", function(){  
    
    it("allows to add a single item", function(){
     weightList.addMeasure({date: new Date(2014,01,01), measure: 85.2});
     expect(weightList.itemCount()).toEqual(1);
    });

    it("finds a measure on a specific date", function(){
     weightList.addMeasure({date: new Date(2014,01,01), measure: 85.2});
     expect(weightList.hasMeasure(new Date(2014,01,01))).toEqual(true);
    });

    it("does not allow to add a new metric on the same day", function(){
     weightList.addMeasure({date: new Date(2014,01,01), measure: 85.2});

     var shouldFail = function() {
        weightList.addMeasure({date: new Date(2014,01,01), measure: 85.2});
     }

     expect(shouldFail).toThrow();
    });

    it("calculates the difference with the previous day metric", function() {
      weightList.addMeasure({date: new Date(2014,01,01), measure: 85.2});
      expect(weightList.getLine(new Date(2014,01,01)).difference).toEqual(0);
      
      weightList.addMeasure({date: new Date(2014,01,02), measure: 84.2});
      expect(weightList.getLine(new Date(2014,01,02)).difference).toEqual(-1.0);
    });
  });
});