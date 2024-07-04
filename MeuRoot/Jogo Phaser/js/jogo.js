var config = {
    type: Phaser.WEBGL,  // Define o tipo de renderização como WebGL
    width: 640,  // Largura da tela do jogo
    height: 480,  // Altura da tela do jogo
    backgroundColor: '#bfcc00',  // Cor de fundo do jogo
    parent: 'phaser-example',  // Elemento pai onde o jogo será renderizado
    scene: {
        preload: preload,  // Função para pré-carregar os assets do jogo
        create: create,  // Função para criar os elementos do jogo
        update: update  // Função para atualizar o estado do jogo
    }
};

var snake;  // Variável para armazenar a cobra
var food;  // Variável para armazenar a comida
var cursors;  // Variável para armazenar as teclas de seta

// Constantes de direção
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var game = new Phaser.Game(config);  // Cria uma nova instância do jogo Phaser com a configuração especificada

function preload() {
    this.load.setBaseURL('https://labs.phaser.io');  // Define a URL base para carregar os assets
    this.load.image('food', 'assets/games/snake/food.png');  // Carrega a imagem da comida
    this.load.image('body', 'assets/games/snake/body.png');  // Carrega a imagem do corpo da cobra
}

function create() {
    var Food = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Food(scene, x, y) {
            Phaser.GameObjects.Image.call(this, scene);  // Chama o construtor da classe base
            this.setTexture('food');  // Define a textura da imagem como 'food'
            this.setPosition(x * 16, y * 16);  // Define a posição da comida
            this.setOrigin(0);  // Define a origem da imagem
            this.total = 0;  // Inicializa a contagem de comidas comidas
            scene.children.add(this);  // Adiciona a comida à cena
        },
        eat: function() {
            this.total++;  // Incrementa a contagem de comidas comidas
        }
    });

    var Snake = new Phaser.Class({
        initialize:
        function Snake(scene, x, y) {
            this.headPosition = new Phaser.Geom.Point(x, y);  // Define a posição da cabeça da cobra
            this.body = scene.add.group();  // Cria um grupo para o corpo da cobra
            this.head = this.body.create(x * 16, y * 16, 'body');  // Cria a cabeça da cobra
            this.head.setOrigin(0);  // Define a origem da cabeça da cobra
            this.alive = true;  // Define se a cobra está viva
            this.speed = 100;  // Define a velocidade da cobra
            this.moveTime = 0;  // Define o tempo de movimento da cobra
            this.tail = new Phaser.Geom.Point(x, y);  // Define a posição da cauda da cobra
            this.heading = RIGHT;  // Define a direção inicial da cobra
            this.direction = RIGHT;  // Define a direção atual da cobra
        },
        update: function(time) {
            if (time >= this.moveTime) {
                return this.move(time);  // Move a cobra se for o momento de se mover
            }
        },
        faceLeft: function() {
            if (this.direction === UP || this.direction === DOWN) {
                this.heading = LEFT;  // Muda a direção da cobra para a esquerda
            }
        },
        faceRight: function() {
            if (this.direction === UP || this.direction === DOWN) {
                this.heading = RIGHT;  // Muda a direção da cobra para a direita
            }
        },
        faceUp: function() {
            if (this.direction === LEFT || this.direction === RIGHT) {
                this.heading = UP;  // Muda a direção da cobra para cima
            }
        },
        faceDown: function() {
            if (this.direction === LEFT || this.direction === RIGHT) {
                this.heading = DOWN;  // Muda a direção da cobra para baixo
            }
        },
        move: function(time) {
            switch (this.heading) {
                case LEFT:
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);  // Move a cabeça para a esquerda
                    break;
                case RIGHT:
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);  // Move a cabeça para a direita
                    break;
                case UP:
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);  // Move a cabeça para cima
                    break;
                case DOWN:
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);  // Move a cabeça para baixo
                    break;
            }
            this.direction = this.heading;  // Atualiza a direção atual da cobra
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);  // Move o corpo da cobra
            var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);  // Verifica se a cabeça colidiu com o corpo
            if (hitBody) {
                console.log('dead');  // Imprime 'dead' no console se houver colisão
                this.alive = false;  // Define a cobra como morta
                return false;  // Retorna falso se a cobra estiver morta
            } else {
                this.moveTime = time + this.speed;  // Atualiza o tempo de movimento
                return true;  // Retorna verdadeiro se a cobra estiver viva
            }
        },
        grow: function() {
            var newPart = this.body.create(this.tail.x, this.tail.y, 'body');  // Cria uma nova parte do corpo na posição da cauda
            newPart.setOrigin(0);  // Define a origem da nova parte do corpo
        },
        collideWithFood: function(food) {
            if (this.head.x === food.x && this.head.y === food.y) {
                this.grow();  // Faz a cobra crescer se colidir com a comida
                food.eat();  // Incrementa a contagem de comidas comidas
                if (this.speed > 20 && food.total % 5 === 0) {
                    this.speed -= 5;  // Aumenta a velocidade da cobra a cada 5 comidas comidas
                }
                return true;  // Retorna verdadeiro se colidir com a comida
            } else {
                return false;  // Retorna falso se não colidir com a comida
            }
        },
        updateGrid: function(grid) {
            this.body.children.each(function(segment) {
                var bx = segment.x / 16;
                var by = segment.y / 16;
                grid[by][bx] = false;  // Marca a posição do corpo da cobra no grid como ocupada
            });
            return grid;  // Retorna o grid atualizado
        }
    });

    food = new Food(this, 3, 4);  // Cria uma nova comida na posição (3, 4)
    snake = new Snake(this, 8, 8);  // Cria uma nova cobra na posição (8, 8)

    cursors = this.input.keyboard.createCursorKeys();  // Cria as teclas de seta para controle da cobra
}

function update(time, delta) {
    if (!snake.alive) {
        return;  // Se a cobra estiver morta, não faz nada
    }

    if (cursors.left.isDown) {
        snake.faceLeft();  // Muda a direção da cobra para a esquerda
    } else if (cursors.right.isDown) {
        snake.faceRight();  // Muda a direção da cobra para a direita
    } else if (cursors.up.isDown) {
        snake.faceUp();  // Muda a direção da cobra para cima
    } else if (cursors.down.isDown) {
        snake.faceDown();  // Muda a direção da cobra para baixo
    }

    if (snake.update(time)) {
        if (snake.collideWithFood(food)) {
            repositionFood();  // Reposiciona a comida se a cobra colidir com ela
        }
    }
}

function repositionFood() {
    var testGrid = [];

    for (var y = 0; y < 30; y++) {
        testGrid[y] = [];
        for (var x = 0; x < 40; x++) {
            testGrid[y][x] = true;  // Inicializa o grid de teste como verdadeiro
        }
    }

    snake.updateGrid(testGrid);  // Atualiza o grid com as posições ocupadas pelo corpo da cobra

    var validLocations = [];

    for (var y = 0; y < 30; y++) {
        for (var x = 0; x < 40; x++) {
            if (testGrid[y][x] === true) {
                validLocations.push({ x: x, y: y });  // Adiciona as posições válidas ao array de locais válidos
            }
        }
    }

    if (validLocations.length > 0) {
        var pos = Phaser.Math.RND.pick(validLocations);  // Escolhe uma posição válida aleatória
        food.setPosition(pos.x * 16, pos.y * 16);  // Reposiciona a comida
        return true;  // Retorna verdadeiro se a comida foi reposicionada
    } else {
        return false;  // Retorna falso se não houver posições válidas
    }
}
