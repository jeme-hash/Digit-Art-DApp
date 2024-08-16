const ArtPiece = require('../art-piece');
const ArtStorage = require('../art-storage');

class ArtController {
    async createArtPiece(data) {
        if (!data.title || !data.uri) {
            // Fallback if RollupStateHandler is missing
            return {
                error: 'Title and URI of the art piece must be provided.',
            };
        }

        const newArtPiece = new ArtPiece(data.creator, data.title, data.description, data.uri);
        ArtStorage.addOne(newArtPiece);

        return {
            ok: true,
            message: 'Art piece created successfully!',
            data: newArtPiece.getData(),
        };
    }

    async getArtPieceById(data) {
        const artPiece = ArtStorage.getOneById(data[0]);
        if (!artPiece) {
            return {
                error: `Art piece not found for id '${data[0]}'`,
            };
        }

        return {
            data: artPiece.getData(),
        };
    }

    async getAllArtPieces() {
        return ArtStorage.getAll();
    }
}

module.exports = new ArtController();
