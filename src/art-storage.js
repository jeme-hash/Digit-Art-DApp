const crypto = require('crypto');

class ArtStorage {
    constructor() {
        this.artPieces = new Map();
    }

    addOne(artPiece) {
        this.artPieces.set(artPiece.id, artPiece);
    }

    getOneById(id) {
        return this.artPieces.get(id);
    }

    getAll() {
        return Array.from(this.artPieces.values());
    }
}

module.exports = new ArtStorage();
