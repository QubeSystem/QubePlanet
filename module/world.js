module.exports = function(Qube) {
    return function(api, callback) {
        Qube.on('core.tick', function requester(info, callback) {
            callback([
                'planet.world'
            ]);
        }, function handler(info, data, callback) {
            if (!data['planet.world']) {
                callback(null, {
                    data : {
                        'planet.world' : {}
                    }
                });
                return;
            }
            var events = [];
            for (var worldKey in data['planet.world']) {
                events.push({
                    event : 'planet.world.tick',
                    info : {
                        worldKey : worldKey,
                        worldName : data['planet.world'][worldKey]
                    }
                });
            }
            callback(null, {
                event : events
            });
        });

        Qube.on('planet.world.register', function requester(info, callback) {
            callback([
                'planet.world'
            ]);
        }, function handler(info, data, callback) {
            if (!data['planet.world']) {
                callback(null, {
                    data : {
                        'planet.world' : {}
                    }
                });
            }
            data['planet.world'][info.worldKey] = info.worldName;
            data[info.worldKey] = {
                name : info.worldName,
                chunks : []
            }
            callback(null, {
                data : data,
                event : [
                    {
                        event : 'planet.world.new',
                        info : info
                    }
                ]
            });
        });
    }
}