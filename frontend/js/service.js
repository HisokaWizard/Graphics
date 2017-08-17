'use strict';
(function() {

  let moduleName = 'app',
    serviceName =  'graphicsService',
    dependencies =
      [
        'dataFactory'
      ],
    service = function (
      dataFactory
    )
    {
      let _public = this;

      _public.getCqCycleNumber = function(substance){
        let result = NaN;
        if(Array.isArray(substance)){
          let deltaArray = [];
          for(let i=0; i<substance.length-1; i++){
            deltaArray.push(substance[i+1]-substance[i]);
          }
          let counter = 0;
          for(let i=0; i<deltaArray.length-1; i++){
            if(deltaArray[i+1] > deltaArray[i]){
              counter++;
              if(5 === counter){
                result = i-4;
              }
            } else {
              counter = 0;
            }
          }
        }
        return result;
      };

      _public.minmaxSubstance = function(){
        let arrayMinValue = [];
        let arrayMaxValue = [];
        let object = {min : 0, max : 0};
        for(let item in dataFactory.substance){
          arrayMinValue.push(Math.min.apply(null, dataFactory.substance[item].data));
          arrayMaxValue.push(Math.max.apply(null, dataFactory.substance[item].data));
        }
        object.min = Math.min.apply(null, arrayMinValue);
        object.max = Math.max.apply(null, arrayMaxValue);
        return object;
      };

      _public.minmaxCycle = function(){
        let object = {min : 0, max : 0};
        object.min = Math.min.apply(null, dataFactory.cycles);
        object.max = Math.max.apply(null, dataFactory.cycles);
        return object;
      };

      _public.CanvasInitialization = function (width, height, canvasId) {
        let initcanv = {};
        if (undefined == canvasId) {
          initcanv = document.getElementById('canvas');
        } else {
          initcanv = document.getElementById(canvasId);
        }
        if (null != initcanv) {
          _public.canvtools = initcanv.getContext('2d');
          _public.Width = width;
          _public.Height = height;
          initcanv.width = width;
          initcanv.height = height;
          _public.koefScaleOX = ((_public.Width-_public.graphsParams.mainIndent)*1)/(Math.max.apply(null, dataFactory.cycles)-Math.min.apply(null, dataFactory.cycles));
          _public.koefScaleOY = ((_public.Height-_public.graphsParams.mainIndent)*1)/(_public.minmaxSub.max-_public.minmaxSub.min);
          _public.drawArea();
          _public.coordinateAxes();
          _public.drawGraphs();
        }
      };

      _public.drawArea = function(){
        _public.canvtools.fillStyle = _public.graphsParams.backgroundColor;
        _public.canvtools.fillRect(0, 0, _public.Width, _public.Height);
        _public.canvtools.strokeStyle = _public.graphsParams.borderColor;
        _public.canvtools.lineWidth = 1;
        _public.canvtools.strokeRect(0, 0, _public.Width, _public.Height);
      };

      _public.coordinateAxes = function(){
        //axes coordinate
        _public.canvtools.beginPath();
        _public.canvtools.lineWidth = 1;
        _public.canvtools.strokeStyle = _public.graphsParams.borderColor;
        _public.canvtools.fillStyle = _public.graphsParams.graphAreaColor;
        _public.canvtools.fillRect(_public.graphsParams.indentOXLeft,
                                   _public.graphsParams.indentOYTop,
                                   _public.Width-_public.graphsParams.mainIndent,
                                   _public.Height-_public.graphsParams.mainIndent);
        _public.canvtools.strokeRect(_public.graphsParams.indentOXLeft,
                                     _public.graphsParams.indentOYTop,
                                     _public.Width-_public.graphsParams.mainIndent,
                                     _public.Height-_public.graphsParams.mainIndent);
        _public.canvtools.font = '15px Arial';
        _public.canvtools.strokeText("Amplification", _public.Width/2, 40);
        _public.canvtools.strokeText("Cycles", _public.Width-80, _public.Height-130);
        _public.canvtools.strokeText("RFU", 50, 40);
        _public.canvtools.font = '10px Arial';
        _public.canvtools.fillStyle = _public.graphsParams.borderColor;
        for(let i=0; i<dataFactory.cycles.length; i+=5){
          _public.canvtools.moveTo(dataFactory.cycles[i]*_public.koefScaleOX+_public.graphsParams.indentOXLeft, _public.Height-_public.graphsParams.AxesOXLittleLineBottom);
          _public.canvtools.lineTo(dataFactory.cycles[i]*_public.koefScaleOX+_public.graphsParams.indentOXLeft, _public.Height-_public.graphsParams.AxesOXLittleLineTop);
          _public.canvtools.fillText(dataFactory.cycles[i], dataFactory.cycles[i]*_public.koefScaleOX+_public.graphsParams.indentOXLeft, _public.Height-_public.graphsParams.indentOXText);
        }
        let arrayOY = _public.substanceAxesValues();
        for(let i=0; i<arrayOY.length; i+=5){
          _public.canvtools.moveTo(_public.graphsParams.AxesOYLittleLineLeft, _public.Height-_public.graphsParams.indentOYBottom-arrayOY[i]*_public.koefScaleOY);
          _public.canvtools.lineTo(_public.graphsParams.AxesOYLittleLineRight, _public.Height-_public.graphsParams.indentOYBottom-arrayOY[i]*_public.koefScaleOY);
          _public.canvtools.fillText(arrayOY[i].toFixed(2), _public.graphsParams.indentOYText, _public.Height-_public.graphsParams.indentOYBottom-arrayOY[i]*_public.koefScaleOY);
        }
        _public.canvtools.stroke();
        //_public.canvtools.fill();
      };

      _public.substanceAxesValues = function(){
        let arrayOY = [];
        let value = _public.minmaxSub.min;
        arrayOY.push(value);
        dataFactory.cycles.forEach(function(element, index, array){
          value += ((_public.minmaxSub.max-_public.minmaxSub.min)/array.length);
          arrayOY.push(value);
        });
        arrayOY.pop();
        return arrayOY;
      };

      _public.drawGraphs = function(){
        _public.canvtools.beginPath();
        _public.canvtools.strokeStyle = _public.graphsParams.graphLineColor;
        for(let element in dataFactory.substance){
          for(let i=1; i<dataFactory.cycles.length-1; i++){
            _public.canvtools.moveTo(_public.graphsParams.indentOXLeft+dataFactory.cycles[i-1]*_public.koefScaleOX,
                                     _public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[element].data[i-1]*_public.koefScaleOY);
            _public.canvtools.lineTo(_public.graphsParams.indentOXLeft+dataFactory.cycles[i]*_public.koefScaleOX,
                                     _public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[element].data[i]*_public.koefScaleOY);
          }
        }
        _public.canvtools.stroke();
      };

      _public.graphsHighlight = function(coord, highlightId){
        for(let element in dataFactory.substance){
          _public.canvtools.beginPath();
          for(let i= 0, j=1; i<dataFactory.cycles.length-1, j<dataFactory.cycles.length-1; i++, j++){
            if((coord.x > (_public.graphsParams.indentOXLeft+dataFactory.cycles[i]*_public.koefScaleOX-_public.graphsParams.searchSubNodeSize)) &&
               (coord.x < (_public.graphsParams.indentOXLeft+dataFactory.cycles[i]*_public.koefScaleOX+_public.graphsParams.searchSubNodeSize)) &&
               (coord.y > (_public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[element].data[i]*_public.koefScaleOY-_public.graphsParams.searchSubNodeSize)) &&
               (coord.y < (_public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[element].data[i]*_public.koefScaleOY+_public.graphsParams.searchSubNodeSize))) {
              for (let element2 in dataFactory.substance) {
                for (let p = 0, s=1; p < dataFactory.cycles.length-1, s<dataFactory.cycles.length-1; p++, s++) {
                  _public.canvtools.beginPath();
                  if(element === element2){
                    _public.canvtools.fillStyle = _public.graphsParams.graphLineColor;
                    _public.canvtools.fillRect(_public.graphsParams.indentOXLeft+dataFactory.cycles[p]*_public.koefScaleOX-_public.graphsParams.searchSubNodeSize,
                                               _public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[element2].data[p]*_public.koefScaleOY-_public.graphsParams.searchSubNodeSize,
                                               _public.graphsParams.rectHighlightSize, _public.graphsParams.rectHighlightSize);
                    highlightId.table = dataFactory.substance[element].id;
                    highlightId.button = dataFactory.substance[element].id;
                  }
                }
                _public.canvtools.fill();
              }
              return highlightId;
            } else{
              _public.canvtools.fillStyle = _public.graphsParams.graphAreaColor;
              _public.canvtools.fillRect(_public.graphsParams.indentOXLeft+dataFactory.cycles[i]*_public.koefScaleOX-_public.graphsParams.searchSubNodeSize,
                                         _public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[element].data[i]*_public.koefScaleOY-_public.graphsParams.searchSubNodeSize,
                                         _public.graphsParams.rectHighlightSize, _public.graphsParams.rectHighlightSize);
              _public.canvtools.strokeStyle = _public.graphsParams.graphLineColor;
              _public.canvtools.moveTo(_public.graphsParams.indentOXLeft+dataFactory.cycles[j-1]*_public.koefScaleOX,
                                       _public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[element].data[j-1]*_public.koefScaleOY);
              _public.canvtools.lineTo(_public.graphsParams.indentOXLeft+dataFactory.cycles[j]*_public.koefScaleOX,
                                       _public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[element].data[j]*_public.koefScaleOY);
              highlightId.table = undefined;
              highlightId.button = undefined;
            }
          }
          _public.canvtools.stroke();
          _public.canvtools.fill();
        }

        return highlightId;
      };

      _public.viewElemHighLight = function(element){
        _public.canvtools.beginPath();
        for(let item in dataFactory.substance){
          if(element.id === dataFactory.substance[item].id){
            for(let i=0; i<dataFactory.cycles.length-1; i++){
              _public.canvtools.fillStyle = _public.graphsParams.graphLineColor;
              _public.canvtools.fillRect(_public.graphsParams.indentOXLeft+dataFactory.cycles[i]*_public.koefScaleOX-_public.graphsParams.searchSubNodeSize,
                                         _public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[item].data[i]*_public.koefScaleOY-_public.graphsParams.searchSubNodeSize,
                                         _public.graphsParams.rectHighlightSize, _public.graphsParams.rectHighlightSize);
            }
          }
        }
        _public.canvtools.fill();
      };

      _public.viewElemDisHighLight = function(){
        _public.canvtools.beginPath();
        for(let item in dataFactory.substance){
          for(let i=0; i<dataFactory.cycles.length-1; i++){
            _public.canvtools.fillStyle = _public.graphsParams.graphAreaColor;
            _public.canvtools.fillRect(_public.graphsParams.indentOXLeft+dataFactory.cycles[i]*_public.koefScaleOX-_public.graphsParams.searchSubNodeSize,
                                       _public.Height-_public.graphsParams.indentOYBottom-dataFactory.substance[item].data[i]*_public.koefScaleOY-_public.graphsParams.searchSubNodeSize,
                                       _public.graphsParams.rectHighlightSize, _public.graphsParams.rectHighlightSize);
          }
        }
        _public.canvtools.fill();
      };


      // members
      _public.minmaxSub = _public.minmaxSubstance();
      _public.minmaxCyc = _public.minmaxCycle();
      _public.koefScaleOX = 0;
      _public.koefScaleOY = 0;
      _public.Width = 0;
      _public.Height = 0;
      _public.nodeCount = 200;
      _public.graphsParams = {
        mainIndent : 200,
        backgroundColor: "lightgrey",
        graphAreaColor : "white",
        graphLineColor: "green",
        borderColor: "black",
        indentOXLeft : 100,
        indentOXText : 120,
        indentOXRight : 50,
        indentOYTop : 50,
        indentOYText : 30,
        indentOYBottom : 180,
        AxesOXLittleLineTop : 160,
        AxesOXLittleLineBottom : 140,
        AxesOYLittleLineLeft : 90,
        AxesOYLittleLineRight : 110,
        searchSubNodeSize: 3,
        rectHighlightSize : 6
      };

    };

  dependencies.push(service);
  angular.module(moduleName).service(serviceName, dependencies);

})();