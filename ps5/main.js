var s = Snap("#svg-container");

function createTree() {
    // tree starts small then grows
    var trunk = s.rect(180, 400, 40, 1).attr({ fill: "#8B4513" });
    trunk.animate({ height: 100 }, 1000, mina.easeinout, growLeaves);
}

function growLeaves() {
    // tree leaves, start w zero radius
    var leaves = s.circle(200, 400, 0).attr({ fill: "#228B22" });
    leaves.animate({ r: 60 }, 1000, mina.easeinout, createApple);
}

function createApple() {
    // apple
    var apple = s.circle(200, 400, 10).attr({ fill: "#FF0000", opacity: 0 });
    apple.animate({ opacity: 1 }, 500, mina.easeinout, function () {
        dropApple(apple);
    });
}

function dropApple(apple) {
    apple.animate(
        { cy: 500 },
        2000,
        mina.bounce,
        function () {
            apple.animate({ cy: 490 }, 500, mina.easeout, function () {
                apple.animate({ cy: 500 }, 500, mina.easein);
            });
        }
    );
}

// function using Lodash
function findMaxValue(numbers) {
    var max = _.max(numbers);
    console.log("max value in the array: " + max);
}

var numbers = [12, 34, 56, 78, 45, 23, 89, 67];

createTree(); 
console.log(findMaxValue(numbers));
