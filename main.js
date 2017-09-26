new Vue({
    el: '#app',
    data: {
        players: [
            { id: 1, name: 'you', health: 10 },
            { id: 2, name: 'monster', health: 10 }
        ],
        isGameStarted: false,
        history: []
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
        buildHistoryItem: function(action, amount, player, target) {
            return { action, amount, player, target };
        },
        doAction: function (action) {
            let damage;
            let life;

            let historyItem;

            switch (action) {
                case 'heal':
                    life = this.heal();
                    this.players[0].health += life;
                    if (this.players[0].health > 100) {
                        this.players[0].health = 100;
                    }
                    historyItem = this.buildHistoryItem('heal', life, 'you', null);
                    break;
                case 'atack':
                    damage = this.atack();
                    this.players[1].health -= damage;
                    historyItem = this.buildHistoryItem('atack', damage, 'you', 'monster')
                    break;
                case 'special':
                    damage = this.special();
                    this.players[1].health -= damage;
                    historyItem = this.buildHistoryItem('atack', damage, 'you', 'monster')
                    break;
            }
            this.history.splice(0, 0, historyItem);

            const randomEnemyAction = Math.random();

            if (randomEnemyAction < 0.20) {         // enemy will heal
                life = this.heal();
                this.players[1].health += life;
                if (this.players[1].health > 100) {
                    this.players[1].health = 100;
                }
                historyItem = this.buildHistoryItem('heal', life, 'monster', null);
            } else if (randomEnemyAction < 0.80) {  // enemy will do normal atack
                damage = this.atack();
                this.players[0].health -= damage;
                historyItem = this.buildHistoryItem('atack', damage, 'monster', 'you')
            } else {                                // enemy will do special atack
                damage = this.special();
                this.players[0].health -= damage;
                historyItem = this.buildHistoryItem('atack', damage, 'monster', 'you')
            }
            this.history.splice(0, 0, historyItem);
        }

    }
})