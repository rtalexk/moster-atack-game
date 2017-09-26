new Vue({
    el: '#app',
    data: {
        players: [
            { id: 1, name: 'you', health: 10 },
            { id: 2, name: 'monster', health: 10 }
        ],
        isGameStarted: false,
        history: [
            { player: 'you', target: 'monster', damage: 10 },
            { player: 'monster', target: 'you', damage: 10 },
            { player: 'you', target: 'monster', damage: 10 },
            { player: 'monster', target: 'you', damage: 10 },
        ]
    },
    computed: {
        finalResult: function() {
            if (this.players[0].health <= 0) {
                return 'lose';
            }
            if (this.players[1].health <= 0) {
                return 'win';
            }
            return null;
        }
    },
    methods: {
        startGame: function () {
            this.isGameStarted = true;
            this.players.map(player => player.health = 100);
        },
        giveUp: function () {
            this.players[0].health = 0;
            this.isGameStarted = false;
        },
        random: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        heal: function () {
            let min = 1,
                max = 10;

            if (Math.random() < 0.15) {
                min = 11;
                max = 20;
            }
            return this.random(min, max);
        },
        atack: function () {
            return this.random(1, 10);
        },
        special: function () {
            return this.random(11, 20);
        },
        doAction: function (action) {
            let damage;
            let life;

            switch (action) {
                case 'heal':
                    life = this.heal();
                    this.players[0].health += life;
                    if (this.players[0].health > 100) {
                        this.players[0].health = 100;
                    }
                    break;
                case 'atack':
                    damage = this.atack();
                    this.players[1].health -= damage;
                    break;
                case 'special':
                    damage = this.special();
                    this.players[1].health -= damage;
                    break;
            }

            const randomEnemyAction = Math.random();

            if (randomEnemyAction < 0.20) {         // enemy will heal
                life = this.heal();
                this.players[1].health += life;
                if (this.players[1].health > 100) {
                    this.players[1].health = 100;
                }
            } else if (randomEnemyAction < 0.80) {  // enemy will do normal atack
                damage = this.atack();
                this.players[0].health -= damage;
            } else {                                // enemy will do special atack
                damage = this.special();
                this.players[0].health -= damage;
            }
        }

    }
})