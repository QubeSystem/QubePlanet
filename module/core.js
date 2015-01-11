module.exports = function(Qube) {
    return function(api, callback) {

        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getChunkKey(args) {
            return args.world + '.chunk.' + [Math.floor(args.x/16), Math.floor(args.y/16), Math.floor(args.z/16)].join(':');
        }

        function serialize(blockMap, chunkData) {
            var chunkBuffer = [];
            chunkData.data.forEach(function(each) {
                chunkBuffer.push(String.fromCharCode(blockMap.fromName[each]));
            });
            return chunkBuffer.join('');
        }

        function deserialize(blockMap, chunkString) {
            var chunkBuffer = [];
            for (var i=0;i<chunkString.length;i++) {
                chunkBuffer.push(blockMap.fromCode[chunkString.charCodeAt(i)]);
            }
            return ndarray(chunkBuffer, [32,32,32]);
        }

        callback({
            random : random,
            getChunkKey : getChunkKey,
            serialize : serialize,
            deserialize : deserialize
        });
    }
}