var UnitPrototype = (function(){

    unit = function() {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.ang = 0;

        this.apply = function( params ) {

            if ( params && typeof params === 'object' ) {
                for ( var name in params ) {
                    this[name] = params[name];
                }
            }
        };

        this.init = function( obj, params ) {

            this.apply( obj );
            this.apply( params );
            this.preInit()

            //this.atInit();
        };

        this.getDistance = function( x, y ) {

            return Math.sqrt( (x - this.x)*(x - this.x) + (y - this.y)*(y - this.y) );
        };

        this.getAngle = function( x, y ) {
            var dx = x - this.x;
            var dy = y - this.y;
            if ( dx == 0 ) return ( dy > 0 ) ? 180 : 0;
            var a = Math.atan( dy / dx ) * 180 / Math.PI;
            a = ( dx > 0 ) ? a : a + 180;
            return a;
        }

    };

    return unit;
}());

var Collection = (function(){

    return {

        Units: [],

        update: function() {

            for ( var curType in this.Units ) {

                if ( this.Units[curType] != undefined )
                    this.Units[curType].forEach(function(u){
                        if ( u ) u.update();
                    });

                //fixme remove -> .splice(i,1)

            }

            return true;
        },

        draw: function() {

            for ( var curType in this.Units ) {

                if ( this.Units[curType] != undefined )
                    this.Units[curType].forEach(function(u){
                        if ( u )
                            u.draw();
                    });

            }
        },

        addUnit: function( obj, param ) {

            var newUnit = new UnitPrototype();

            newUnit.init( obj, param );

            var curType = newUnit.type;

            if ( this.Units[curType] == undefined )
                this.Units[curType] = [];

            this.Units[curType].push( newUnit );

            return newUnit;
        }

    }

}());
