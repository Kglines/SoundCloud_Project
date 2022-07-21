const express = require('express');
const router = express.Router();

const { User, Song, Album } = require('../../db/models');

// GET all Albums of an Artist based on the Artist's id
router.get('/:artistId/albums', async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId);

    if(artist){
        const albums = await Album.findAll({
            where: { userId: artistId },
            attributes: [
                "id",
                "userId",
                "title",
                "description",
                "createdAt",
                "updatedAt",
                "previewImage"
            ]
        })
        res.json(albums)
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
})

// GET all Songs of an Artist from an id
router.get('/:artistId/songs', async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId);

    if(artist){
        const songs = await Song.findAll({
            where: { userId: artistId },
            attributes: [
                "id",
                "userId",
                "albumId",
                "title",
                "description",
                "url",
                "createdAt",
                "updatedAt",
                "previewImage"
            ]
        })
        res.json(songs);
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
})

// GET details of an artist from id
router.get('/:artistId', async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId, {
        attributes: [
            "id", "username", "previewImage"
        ]
    });

    const totalSongs = await Song.count({ where: { userId: artistId }});
    const totalAlbums = await Album.count({ where: { userId: artistId }});

    if(artist){
        res.json({...artist.dataValues, totalSongs, totalAlbums})
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
    
})

module.exports = router;
