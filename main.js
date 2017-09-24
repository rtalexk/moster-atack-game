new Vue({
    el: '#app',
    data: {
        players: [
            { id: 1, name: 'you', health: 100 },
            { id: 2, name: 'monster', health: 100 }
        ],
        isGameStarted: true,
        history: [
            { player: 'you', target: 'monster', damage: 10 },
            { player: 'monster', target: 'you', damage: 10 },
            { player: 'you', target: 'monster', damage: 10 },
            { player: 'monster', target: 'you', damage: 10 },
        ]
    },
})