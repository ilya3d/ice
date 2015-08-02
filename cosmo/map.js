var Map = (function(){

    return {

        x: 0,
        y: 0,

        init: function() {
            ICE.texture.load( 'bg', '1.png' );
        },

        update: function() {

        },

        draw: function() {
            var sz = 256;

            //ICE.texture.drawFull(
            //    'bg',
            //    Math.round(this.x % sz) - sz, Math.round(this.y % sz) - sz,
            //    256, 256,
            //    parseInt( ICE.viewW / sz ) + 2,
            //    parseInt( ICE.viewH / sz ) + 2
            //);

            ICE.texture.drawFull(
                'bg',
                0, 0,
                256, 256,
                parseInt( ICE.viewW / sz ) + 2,
                parseInt( ICE.viewH / sz ) + 2
            );
        },

        updPos: function( x, y ) {
            this.x = parseInt( x - ICE.viewW / 2 );
            this.y = parseInt( y - ICE.viewH / 2 );
        },

        isView: function( x, y ) {
            return ( x > this.x ) && ( x < this.x + ICE.viewW ) &&
                ( y > this.y ) && ( y < this.y + ICE.viewH );
        }

    }


}());