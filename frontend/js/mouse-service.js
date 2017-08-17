'use strict';
(function() {

  let moduleName = 'app',
    serviceName =  'mouseService',
    dependencies =
      [
      ],
    service = function(

    ) {

      let _public = this;

      _public.result = {
        x: 0,
        y: 0
      };

      _public.MouseEventValue = {
        up : "mouse up called",
        down : "mouse down called",
        leave: "mouse leave called",
        over : "mouse over called"
      };

      _public.onMouseMove = function (event) {
        if (!event) {
          event = window.event;
          return _public.result;
        }
        if (event.pageX || event.pageY) {
          _public.result.x = event.pageX;
          _public.result.y = event.pageY;
        }
        else if (event.clientX || event.clientY) {
          _public.result.x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
          _public.result.y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        if (event.target)
        {
          let offEl = event.target;
          let offX = 0;
          let offY = 0;
          if (typeof(offEl.offsetParent) != "undefined") {
            while (offEl){
              offX += offEl.offsetLeft;
              offY += offEl.offsetTop;

              offEl = offEl.offsetParent;
            }
          }
          else{
            offX = offEl.x;
            offY = offEl.y;
          }
          _public.result.x -= offX;
          _public.result.y -= offY;
        }
        return _public.result;
      };

      _public.MouseDown = function(event){
        if(event){
          return _public.MouseEventValue.down;
        }
      };

      _public.MouseUp = function(event){
        if(event){
          return _public.MouseEventValue.up;
        }
      };

      _public.MouseLeave = function(event){
        if(event){
          return _public.MouseEventValue.leave;
        }
      };

      _public.MouseOver = function(event){
        if(event){
          return _public.MouseEventValue.over;
        }
      };
    };

  dependencies.push(service);
  angular.module(moduleName).service(serviceName, dependencies);

})();