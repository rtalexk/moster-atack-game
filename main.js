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
        finalResult: function () {
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
        buildHistoryItem: function (action, amount, player, target) {
            return { action, amount, player, target };
        },
        randomEnemyAction: function () {
            const random = Math.random();
            if (random < 0.20) { return 'heal'; } 
            if (random < 0.80) { return 'atack'; }
            return 'special';
        },
        doAction: function (action) {
            let amount;

            let historyItem;

            if (action === 'heal') {
                amount = this.heal();
                this.players[0].health += amount;
                if (this.players[0].health > 100) {
                    this.players[0].health = 100;
                }
            } else {
                amount = action === 'atack' ? this.atack() : this.special();
                this.players[1].health -= amount;
            }
            historyItem = this.buildHistoryItem(action, amount, 'you', 'monster')
            this.history.splice(0, 0, historyItem);

            const enemyAction = this.randomEnemyAction();

            if (enemyAction === 'heal') {
                amount = this.heal();
                this.players[1].health += amount;
                if (this.players[1].health > 100) {
                    this.players[1].health = 100;
                }
            } else {
                amount = enemyAction === 'atack' ? this.atack() : this.special();
                this.players[0].health -= amount;
            }
            historyItem = this.buildHistoryItem('atack', amount, 'monster', 'you')
            this.history.splice(0, 0, historyItem);
        }

    }
})