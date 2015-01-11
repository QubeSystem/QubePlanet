//var Qube = require('../../Qube');
var Qube = {};

Qube.module({
    name : 'QubePlanet.core',
    after : []
}, require('./module/core')(Qube));

Qube.module({
    name : 'QubePlanet.world',
    after : [
        'QubePlanet.core'
    ]
}, require('./module/world')(Qube));

Qube.module({
    name : 'QubePlanet.chunk',
    after : [
        'QubePlanet.core',
        'QubePlanet.world'
    ]
}, require('./module/chunk')(Qube));

Qube.module({
    name : 'QubePlanet.block',
    after : [
        'QubePlanet.core',
        'QubePlanet.world',
        'QubePlanet.block'
    ]
}, require('./module/block')(Qube));

Qube.module({
    name : 'QubePlanet.entityblock',
    after : [
        'QubePlanet.core',
        'QubePlanet.world',
        'QubePlanet.chunk',
        'QubePlanet.block'
    ]
}, require('./module/entityblock')(Qube));

Qube.module({
    name : 'QubePlanet.entity',
    after : [
        'QubePlanet.core',
        'QubePlanet.world',
        'QubePlanet.chunk'
    ]
}, require('./module/entity')(Qube));

Qube.module({
    name : 'QubePlanet.player',
    after : [
        'QubePlanet.core',
        'QubePlanet.entity'
    ]
}, require('./module/player')(Qube));