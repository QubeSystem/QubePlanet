var ndarray = require('ndarray')

module.exports = function(Qube) {
    return function(api, callback) {
        var core = api['QubePlanet.core'];
        Qube.on('planet.world.tick', function requester(info, callback) {
            callback([
                info.worldKey
            ]);
        }, function handler(info, data, callback) {
            var events = [];
            var world = data[info.worldKey];
            world.chunk.forEach(function(chunkKey) {
                events.push({
                    event : 'planet.chunk.tick',
                    info : {
                        worldKey : world.worldKey,
                        chunkKey : chunkKey
                    }
                });
            });
            callback({
                event : events
            });
        });

        Qube.on('planet.chunk.tick', function requester(info, callback) {
            callback([
                info.world + '.chunk.' + [info.x,info.y,info.z].join(':') + '.block'
            ]);
        }, function handler(info, data, callback) {
            var chunk = deserialize(data[info.world + '.chunk.' + [info.x,info.y,info.z].join(':') + '.block']);
            var x = core.random(0, 15);
            var y = core.random(0, 15);
            var z = core.random(0, 15);
            var block = chunk.get(x, y, z);
            callback({
                event : [
                    {
                        event : 'planet.block.update',
                        info : {
                            block : block
                        }
                    }
                ]
            });
        });

        callback({
            serialize : serialize,
            deserialize : deserialize
        });
    }
}