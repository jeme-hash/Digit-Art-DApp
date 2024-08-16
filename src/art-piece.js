const crypto = require('crypto');

class ArtPiece {
    constructor(creator, title, description, uri) {
        this.id = crypto.randomUUID();
        this.creator = creator;
        this.title = title;
        this.description = description;
        this.uri = uri; // URI to the digital artwork
    }

    getData() {
        return {
            id: this.id,
            creator: this.creator,
            title: this.title,
            description: this.description,
            uri: this.uri
        };
    }
}

module.exports = ArtPiece;
