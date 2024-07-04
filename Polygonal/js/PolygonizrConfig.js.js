$(document).ready(function () {
    $('#polygonal-background').polygonizr({
        numberOfNodes: 50,
        nodeMovementDistance: 100,
        specifyPositions: false,
        randomizePolygonMesh: true,
        enableNodeHover: true,
        nodeDotSize: 5,
        nodeDotColor: 'rgba(255,255,255,1)',
        nodeLineColor: 'rgba(255,255,255,0.5)',
        nodeFillColor: 'rgba(0,0,0,0)',
        animationVelocity: 1,
        borderColor: 'rgba(0,0,0,0)',
        borderRadius: 10,
        connectBorders: true,
        nodeEaseOut: 'bounce',
        nodeEaseIn: 'bounce',
        nodeAnimationTime: 3000,
        showNodes: true,
        velocity: 0.3,
        duration: 60000,
        maxNodeMovement: 200,
    });
});
