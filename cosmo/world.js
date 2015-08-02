(function(){


    var Player = {
        name:'hohoho',
        texture: 'enemy',
        x:100, y: 250, w:32, h:32,
        gx: 0, gy: 0,
        a: 0, a_max: 0.01,
        alp: 0,
        v: 0,
        vx: 0, vy: 0,
        v_max: 4,
        v_add: 0.2,
        preInit: function(){

        },
        update: function() {


            if ( ICE.input.keyPress(37) )
                this.alp -= 2;
            if ( ICE.input.keyPress(39) )
                this.alp += 2;

            this.a = 0;
            if ( ICE.input.keyPress(38) )
                this.a = this.a_max;
            if ( ICE.input.keyPress(32) )
                this.a = this.a_max * 10;
            if ( ICE.input.keyPress(40) ) {
                //this.a = - this.a_max;
                this.vx *= 0.9;
                this.vy *= 0.9;
            }


            //this.ax = this.a_add * Math.cos( this.alp * Math.PI / 180 );
            if ( this.gx > 1 ) this.gx = 1;
            if ( this.gy > 1 ) this.gy = 1;

            this.vx += this.a * Math.cos( this.alp * Math.PI / 180 ) + this.gx;
            this.vy += this.a * Math.sin( this.alp * Math.PI / 180 ) + this.gy;

            this.v = Math.sqrt( this.vx*this.vx + this.vy*this.vy );

            this.x += this.vx;
            this.y += this.vy;

            this.gx = 0;//Math.cos( this.alp * Math.PI / 180 );
            this.gy = 0;//Math.sin( this.alp * Math.PI / 180 );

            return true;
        },

        draw: function() {

            if ( ICE.app.map.isView( this.x, this.y ) )
                ICE.texture.drawRot( 'player', this.x-ICE.app.map.x, this.y-ICE.app.map.y, this.w, this.h, this.alp );

        },

        addGrav: function( dx, dy ) {
            this.gx += dx;
            this.gy += dy;
        }
    };


    var Planet = {
        x: 0,
        y: 0,
        r: 20,
        m: 0,
        texture: 'planet',
        preInit: function() {
            ICE.texture.load( 'planet', '3.png' );
        },
        draw: function() {

            if ( ICE.app.map.isView( this.x, this.y ) )
                ICE.texture.drawRect( this.texture, this.x-ICE.app.map.x-this.r, this.y-ICE.app.map.y-this.r, 2*this.r, 2*this.r );

        },
        update: function() {
            var ang = Game.player.getAngle(this.x, this.y);
            var d = Game.player.getDistance(this.x, this.y);
            var g = this.m / ( d * d );
            if ( d > this.r * 0.8 ) {
                var dx = g * Math.cos( ang * Math.PI / 180 );
                var dy = g * Math.sin( ang * Math.PI / 180 );
                Game.player.addGrav(dx, dy);
            } else {
                Game.player.vx = 0;
                Game.player.vx = 0;
            }
            // trenie
            if ( d < 2 * this.r && Game.player.v > 1.5 ) {
                Game.player.vx *= 0.99;
                Game.player.vy *= 0.99;
                //var dx = 0.1 * g * Math.cos( (ang+90) * Math.PI / 180 );
                //var dy = 0.1 * g * Math.sin( (ang+90) * Math.PI / 180 );
                //Game.player.addGrav(dx, dy);
            }
        }
    };


    var Bonus = {
        x: 0, y: 0, r: 10,
        texture: 'bonus',
        dead: false,
        preInit: function() {
            ICE.texture.load( 'bonus', '4.png' );
        },
        draw: function() {
            if ( !this.dead && ICE.app.map.isView( this.x, this.y ) )
                ICE.texture.drawRect( this.texture, this.x-ICE.app.map.x-this.r, this.y-ICE.app.map.y-this.r, 2*this.r, 2*this.r );
        },
        update: function() {
            if ( !this.dead ) {
                if ( this.getDistance(Game.player.x, Game.player.y) < 10 )
                    this.dead = true;
            }
        }
    };


    var Game = {

        units: null,
        player: null,
        map: null,

        init: function() {


            ICE.texture.load( 'player', '2.png' );

            this.units = Collection;

            this.player = this.units.addUnit( Player, {} );

            this.units.addUnit( Planet, {x: 0, y: 600, m: 100, r: 20} );
            this.units.addUnit( Planet, {x: 700, y: 100, m: 200, r: 40} );
            this.units.addUnit( Planet, {x: 900, y: 500, m: 300, r: 60} );
            this.units.addUnit( Planet, {x: 900, y: 1000, m: 1000, r: 200} );

            this.units.addUnit( Bonus, {x: 500, y: 500} );
            this.units.addUnit( Bonus, {x: 100, y: 300} );
            this.units.addUnit( Bonus, {x: 400, y: 370} );
            this.units.addUnit( Bonus, {x: 500, y: 120} );

            this.map = Map;

            this.map.init();
        },

        update: function() {

            this.player.update();
            this.units.update();
            this.map.updPos( this.player.x, this.player.y );

            return true;
        },

        draw: function() {


            this.map.draw();
            this.units.draw();
            this.player.draw();
            ICE.draw.text( 'mySpace', 100, 10, 16 );
            ICE.draw.text( 'v: ' + this.player.v, 10, 100, 10 );
            ICE.draw.text( 'vx: ' + this.player.vx, 10, 110, 10 );
            ICE.draw.text( 'vy: ' + this.player.vy, 10, 120, 10 );
            ICE.draw.text( 'a: ' + this.player.a, 10, 130, 10 );
            ICE.draw.text( 'gx: ' + this.player.gx, 10, 200, 10 );
            ICE.draw.text( 'gy: ' + this.player.gy, 10, 210, 10 );
        }

    };

    ICE.setApp( Game );
}());
