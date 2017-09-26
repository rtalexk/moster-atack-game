new Vue({
    el: '#app',
    data: {
        players: [
            { id: 1, name: 'you', health: 1 },
            { id: 2, name: 'monster', health: 1 }
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
        action: function (sourceIndex, targetIndex, action) {
            const amount = action === 'heal'
                ? this.heal() * -1
                : action === 'atack'
                    ? this.atack()
                    : this.special();

            const index = action === 'heal' ? sourceIndex : targetIndex;
            this.players[index].health -= amount;

            if (action === 'heal' && this.players[sourceIndex].health > 100) {
                this.players[sourceIndex].health = 100;
            }

            return Math.abs(amount);
        },
        doAction: function (action) {
            let amount = this.action(0, 1, action);
            let historyItem = this.buildHistoryItem(action, amount, 'you', 'monster')
            this.history.splice(0, 0, historyItem);

            const enemyAction = this.randomEnemyAction();

            if (this.players[1].health < 0) { return; }

            amount = this.action(1, 0, enemyAction);
            historyItem = this.buildHistoryItem(enemyAction, amount, 'monster', 'you')
            this.history.splice(0, 0, historyItem);
        }

    }
})