module.exports = function(Qube) {
    return function(api, callback) {
        var core = api['QubePlanet.core'];
        Qube.on('planet.block.register', function requester(info, callback) {
            callback([
                'planet.block'
            ]);
        }, function handler(info, data, callback) {
            var blockMap = data['planet.block'];
            if (!blockMap) {
                blockMap = {
                    fromCode : [],
                    fromName : {}
                }
            }
            blockMap.fromName[info.blockKey] = blockMap.fromCode.length;
            blockMap.fromCode.push(info.blockKey);
            callback({
                data : {
                    'planet.block': blockMap
                }
            });
        });

        Qube.on('planet.block.set', function requester(info, callback) {
            callback([
                core.getChunkKey(info),
                'planet.block'
            ]);
        }, function handler(info, data, callback) {
            var blockMap = data['planet.block'];
            var chunk = core.deserialize(blockMap, data[core.getChunkKey(info)]);
            var x = info.x % 16;
            var y = info.y % 16;
            var z = info.z % 16;
            var oldBlock = chunk.get(x, y, z);
            chunk.set(x,y,z,info.block);

            var result = {};
            result[core.getChunkKey(info)] = core.serialize(blockMap, chunk);
            callback({
                data : result,
                event : [
                    {
                        event : 'planet.block.onPlace',
                        info : {
                            world : info.world,
                            x : info.x,
                            y : info.y,
                            z : info.z,
                            oldBlock : oldBlock,
                            newBlock : info.block
                        }
                    }
                ]
            });
        });

        Qube.on('planet.block.get', function requester(info, callback) {
            callback([
                core.getChunkKey(info),
                'planet.block'
            ]);
        }, function handler(info, data, callback) {
            var blockMap = data['planet.block'];
            var chunk = core.deserialize(blockMap, data[core.getChunkKey(info)]);
            var block = chunk.get(info.x % 16, info.y % 16, info.z % 16);
            callback({
                event : [{
                    event : info.event,
                    info : {
                        block : block
                    }
                }]
            });
        });
    }
}