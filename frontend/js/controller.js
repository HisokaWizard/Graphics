'use strict';
(function () {

  let moduleName = 'app',
    controllerName =  'graphicsCtrl',
    dependencies =
      [
        'graphicsService',
        'mouseService',
        'dataFactory',
        'appInfo'
      ],
    controller = function (
      graphicsService,
      mouseService,
      dataFactory,
      appInfo
    )
    {
      let _public = this;
      let _private = {};

      _public.OX = dataFactory.cycles;
      _public.OY = dataFactory.substance;
      _public.textOnView = appInfo;
      _public.HighLightId = {table : undefined, button : undefined};
      _public.viewHighLight = {table : undefined, button : undefined};

      // mouse event handlers
      _public.canvas_coord = {x: 0, y: 0};
      _public.MouseDownState = "";
      _public.MouseUpState = "";
      _public.MouseOverState = "";
      _public.MouseLeaveState = "";
      _public.OnMouseMove = function (event) {
        let new_cord = mouseService.onMouseMove(event);
        _public.MouseDownState = "";
        _public.MouseUpState = "";
        _public.MouseOverState = "";
        _public.MouseLeaveState = "";
        _public.canvas_coord.x = new_cord.x;
        _public.canvas_coord.y = new_cord.y;
        _public.graphsHighlight();
        return _public.canvas_coord;
      };
      _public.GetCoord = function () {
        return _public.canvas_coord;
      };
      _public.MouseDown = function (event) {
        return _public.MouseDownState = mouseService.MouseDown(event);
      };
      _public.MouseUp = function (event) {
        return _public.MouseUpState = mouseService.MouseUp(event);
      };
      _public.MouseOver = function(event){
        return _public.MouseOverState = mouseService.MouseOver(event);
      };
      _public.MouseLeave = function(event){
        return _public.MouseLeaveState = mouseService.MouseLeave(event);
      };
      ///////////////////////////////////////

      _public.getCqCycleNumber = function(substance){
        return graphicsService.getCqCycleNumber(substance);
      };

      _public.CanvasInitialization = function (width, height, canvasId) {
        graphicsService.CanvasInitialization(width, height, canvasId);
      };
      _public.CanvasInitialization(1060, 850, 'canvas');

      _public.graphsHighlight = function(){
        _public.HighLightId = graphicsService.graphsHighlight(_public.GetCoord(), _public.HighLightId);
      };

      _public.tableHighLight = function(element){
        graphicsService.viewElemHighLight(element);
        _public.viewHighLight.button = element.id;
      };

      _public.buttonHighLight = function(element){
        graphicsService.viewElemHighLight(element);
        _public.viewHighLight.table = element.id;
      };

      _public.tableDisHighLight = function(element){
        graphicsService.viewElemDisHighLight(element);
        _public.viewHighLight.button = undefined;
      };

      _public.buttonDisHighLight = function(element){
        graphicsService.viewElemDisHighLight(element);
        _public.viewHighLight.table = undefined;
      };
    };

  dependencies.push(controller);
  angular.module(moduleName).controller(controllerName, dependencies);
})();